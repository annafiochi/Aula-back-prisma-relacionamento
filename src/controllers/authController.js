import UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {
    // Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

    // Criar um novo usuário
async register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Todos os campos nome email e senha são obrigatórios' });
        }

        // Verifica se o usuário já existe
        const userExists = await UserModel.findByEmail(email);
        if (userExists) {
            return res.status(400).json({ error: 'este email ja está em uso' });
        }
    
        //hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const data = {
            name,
            email,
            password: hashedPassword,
        };

// Cria o usuário
        const user = await UserModel.create(data);
       
        return res.status(201).json({
        message: 'Usuário criado com sucesso', 
        user });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
}
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: 'Os campos email e senha são obrigatórios' });
            }

            const userExists = await UserModel.findByEmail(email);
            if (!userExists) {
                return res.status(400).json({ error: 'Credenciais inválidas' });
            }

            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Credenciais inválidas' });
            }

            const token = jwt.sign(
                { 
                    id: userExists.id,
                    name: userExists.name,
                    email: userExists.email 
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '24h' // O token expira em 24 horas
                }
            );

            return res.json({
                message: 'Login realizado com sucesso',
                token,
                user: {
                    id: userExists.id,
                    name: userExists.name,
                    email: userExists.email
                }
            });
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            res.status(500).json({ error: "Erro ao fazer login" });
        }
    }
}

export default new AuthController();
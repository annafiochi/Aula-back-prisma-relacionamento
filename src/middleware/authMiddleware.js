import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {

    const authHeader= req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    //retira o Bearer do token
    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Token mal formatado' });
    };

    const [scheme, token] = parts;


    //verifica se o token é valido
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        // Adiciona o usuário decodificado à requisição
        req.user = decoded;
        return next();
    });
}

export default authMiddleware;
import express from "express";
import CardController from "../controllers/cardController.js";

const cardRouter = express.Router();

// Rotas de Personagens
// GET /colecao - Listar todos as coleções
cardRouter.get("/", CardController.getAllCards);

// GET /colecoes/:id - Obter uma coleção pelo ID
cardRouter.get("/:id", CardController.getCardById);

// POST /colecoes - Criar uma nova coleção
cardRouter.post("/", CardController.createCard);

// // PUT /colecoes/:id - Atualizar uma coleção
cardRouter.put("/:id", CardController.updatedCard);

// // DELETE /colecoes/:id - Deletar uma coleção
cardRouter.delete("/:id", CardController.deleteCard);

export default cardRouter;

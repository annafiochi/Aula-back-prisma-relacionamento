import express from "express";
import CollectionController from "../controllers/collectionController.js";

const collectionRouter = express.Router();

// Rotas de Personagens
// GET /colecao - Listar todos as coleções
collectionRouter.get("/", CollectionController.getAllCollections);

// GET /colecoes/:id - Obter uma coleção pelo ID
collectionRouter.get("/:id", CollectionController.getCollectionsById);

// POST /colecoes - Criar uma nova coleção
collectionRouter.post("/", CollectionController.createCollection);

// // PUT /colecoes/:id - Atualizar uma coleção
collectionRouter.put("/:id", CollectionController.updateCollection);

// // DELETE /colecoes/:id - Deletar uma coleção
collectionRouter.delete("/:id", CollectionController.deleteCollection);

export default collectionRouter;

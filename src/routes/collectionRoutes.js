import express from "express";
import CollectionController from "../controllers/collectionController.js";

const collectionRouter = express.Router();

// Rotas de Personagens
// GET /colecao - Listar todos as coleções
collectionRouter.get("/", CollectionController.getAllCollections);

// GET /collections/:id - Obter um Personagem pelo ID
// collectionRouter.get("/:id", collectionController.getCollectionsById);

// // POST /collections - Criar um novo Collections
// collectionRouter.post("/", collectionController.createCollections);

// // PUT /collections/:id - Atualizar um Collections
// collectionRouter.put("/:id", collectionController.updateCollections);

// // DELETE /collections/:id - Remover um Collections
// collectionRouter.delete("/:id", collectionController.deleteCollections);

export default collectionRouter;

import CollectionModel from "../models/collectionModel.js";

class CollectionController {
  // GET /api/coleçao
  async getAllCollections(req, res) {
    try {
      const colecoes = await CollectionModel.findAll();
      res.json(colecoes);
    } catch (error) {
      console.error("Erro ao buscar coleções:", error);
      res.status(500).json({ error: "Erro ao buscar coleções" });
    }
  }

  // GET /api/colecao/:id
  async getCollectionsById(req, res) {
    try {
      const { id } = req.params;

      const colecao = await CollectionModel.findById(id);

      if (!colecao) {
        return res.status(404).json({ error: "Coleção não encontrado" });
      }

      res.json(colecao);
    } catch (error) {
      console.error("Erro ao buscar coleção:", error);
      res.status(500).json({ error: "Erro ao buscar coleção" });
    }
  }

  // POST /api/colecoes
  async createCollection(req, res) {
    try {
      // Validação básica
      const { name, description, releaseYear } = req.body;

      // Verifica se o nome e o ano de lançamento foram fornecidos
      if (!name || !releaseYear) {
        return res
          .status(400)
          .json({ error: "Nome e ano de lançamento são obrigatórios" });
      }

      // Criar o novo coleção
      const newCollection = await CollectionModel.create(
        name,
        description,
        releaseYear
      );

      if (!newCollection) {
        return res.status(400).json({ error: "Erro ao criar coleção" });
      }

      res.status(201).json(newCollection);
    } catch (error) {
      console.error("Erro ao criar coleção:", error);
      res.status(500).json({ error: "Erro ao criar colecão" });
    }
  }

  // PUT /api/colecoes/:id
  async updateCollection(req, res) {
    try {
      const { id } = req.params;
      const { name, description, releaseYear } = req.body;

      // Atualizar o coleção
      const updatedCollection = await CollectionModel.update(
        name,
        description,
        releaseYear,
      );

      if (!updatedCollection ) {
        return res.status(404).json({ error: "Coleção não encontrado" });
      }

      res.json(updatedCollection );
    } catch (error) {
      console.error("Erro ao atualizar coleção:", error);
      res.status(500).json({ error: "Erro ao atualizar coleção" });
    }
  }

  // DELETE /api/colecoes/:id
  async deleteCollection(req, res) {
    try {
      const { id } = req.params;

      // Remover o coleção
      const result = await CollectionModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Coleção não encontrado" });
      }

      res.status(204).end(); // Resposta sem conteúdo
    } catch (error) {
      console.error("Erro ao remover coleção:", error);
      res.status(500).json({ error: "Erro ao remover coleção" });
    }
  }
}

export default new CollectionController();

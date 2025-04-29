import express from 'express';

import authRouter from './auth.routes.js';
import collectionRouter from './collectionRoutes.js';
import cardRouter from './cardRoutes.js';
import animeRouter from './animeRoutes.js';


import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

//rotas publicas
router.use('/auth', authRouter); // Usar as rotas de autenticação
router.use('/animes', animeRouter); // Usar as rotas de animes
router.use('/colecoes', collectionRouter); // Usar as rotas de coleções
router.use('/cartas', cardRouter); // Usar as rotas de cartas

export default router;
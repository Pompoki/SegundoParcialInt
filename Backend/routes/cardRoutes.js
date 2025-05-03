import express from 'express';
import { getCard, addCard, deleteCard } from '../controllers/cardControllers.js';

const router = express.Router();

router.route('/')
    .get(getCard)
    .post(addCard);

router.route('/:id')
    .delete(deleteCard);

export default router;

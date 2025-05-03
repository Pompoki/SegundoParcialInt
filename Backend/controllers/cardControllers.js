
import asyncHandler from 'express-async-handler';
import Carta from "../models/cardModels.js";

export const getCard = asyncHandler(async (req, res) => {
    const cartas = await Carta.find();
    res.status(200).json(cartas);
});

export const addCard = asyncHandler(async (req, res) => {
    const { nombre, descripcion, imagen, link } = req.body;

    const nuevaCarta = new Carta({ nombre, descripcion, imagen, link });
    const cartaGuardada = await nuevaCarta.save();

    res.status(201).json(cartaGuardada);
});

export const deleteCard = asyncHandler(async (req, res) => {
    const carta = await Carta.findById(req.params.id);
    if (!carta) {
        res.status(404);
        throw new Error("Carta no encontrada");
    }

    await Carta.deleteOne({ _id: req.params.id });

    res.status(200).json({ mensaje: `Carta con ID ${req.params.id} eliminada` });
});


import { Schema, model } from "mongoose";

const cardSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    imagen: { type: String },
    link: { type: String },
}, {
    timestamps: true,
});

export default model("Carta", cardSchema);

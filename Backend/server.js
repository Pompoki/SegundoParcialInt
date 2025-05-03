import express from 'express';
import 'dotenv/config'; 
import cors from 'cors';
import connectDB from './config/db.js';
import cardRoutes from './routes/cardRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/catalogodeIAs', cardRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente.");
});

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));

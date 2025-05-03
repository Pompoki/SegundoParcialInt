import { connect } from "mongoose";

const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI);
        console.log(`MongoDB Atlas conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;

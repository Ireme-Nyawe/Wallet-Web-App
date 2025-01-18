import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_DB_URL;

const dbConnection = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error(`Failed to connect to the database: ${error.message}`);
        process.exit(1);
    }
};

export default dbConnection;

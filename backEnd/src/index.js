import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import router from "./routes/index.js";
import dbConnection from "./database/config/config.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/wallet-app-api/", router);
app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found. Please check the URL very well!',
  });
});
const port = process.env.PORT;

dbConnection()
  .then(() => {
    app.listen(port, () => console.log(`App running on PORT ${port}`));
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

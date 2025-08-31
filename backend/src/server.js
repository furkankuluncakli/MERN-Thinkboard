import express from "express";
import router from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

const app = express();

const PORT = process.env.PORT || 5001;

dotenv.config();

app.use(express.json());

app.use("/api/notes", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT);
  });
});

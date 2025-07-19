import express from "express";
import movieRouths from "./routes/movie.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

//dotenv.config({ path: "../.env" });
dotenv.config();
const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/movie", movieRouths);

//if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get(/^\/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});
//}

app.listen(5001, () => {
  console.log("Servidor corriendo en el puerto 5001");
});

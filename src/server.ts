import * as dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

import { router as movies } from "./routers/movies/movies";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use("/movies", movies);

app.get("/", async (request, response) => {
    return response.send({ API: "Bem vindo a API da Rocketflix" });
});

app.listen(PORT, () => {
    console.log("App is running on port " + PORT);
});
import { Router } from "express";

import { requestRandomMovie } from "./API";

export const router = Router();

router.get("/random", async (request, response) => {
    const movie = await requestRandomMovie();

    if (movie === null) return response.sendStatus(404);

    response.status(200).send(movie);
});
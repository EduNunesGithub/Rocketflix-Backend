import fetch from "node-fetch";

const baseURL = "https://api.themoviedb.org/3/";

interface Movie {
    adult: boolean;
    id: number;
    overview: string;
    poster_path: string;
    title: string;
};

interface RequestLatestMovie {
    (): Promise<Movie | null>
};

interface RequestRandomMovie {
    (): Promise<Movie | null>
};

export const requestLatestMovie: RequestLatestMovie = async () => {
    const response: { data: Response } = {
        data: {} as Response
    };

    try {
        // @ts-ignore
        response.data = await fetch(`${baseURL}/movie/latest?api_key=${process.env.TMDB_API_KEY}`);
    } catch {
        return null;
    };

    if (!response.data.ok) return null;

    return await response.data.json();
};

export const requestRandomMovie: RequestRandomMovie = async () => {
    const numberOfAttempts = {
        current: 0,
        maximum: 10
    }
    const latestMovie = await requestLatestMovie();

    if (latestMovie === null) return null;

    while (true) {
        if (numberOfAttempts.current === numberOfAttempts.maximum) break;

        const ID = Math.floor(Math.random() * (latestMovie.id + 1));
        const response: { data: Response } = {
            data: {} as Response
        };

        try {
            // @ts-ignore
            response.data = await fetch(`${baseURL}/movie/${ID}?api_key=${process.env.TMDB_API_KEY}`);
        } catch (error) {
            const foo = "bar";
        };

        numberOfAttempts.current += 1;

        if (response.data.status === 200) {
            const data: Movie = await response.data.json();

            if (data.adult === false) return data;
        };
    };

    return null;
};
export interface IMovie {
    movieId: string;
    title: string;
    genres: string[];
    score?: number;
}

export interface IUser {
    _id: string,
    ratingsIndexedByMovieId: IRatingsIndexedByMovieId,
    [x: string]: any,
}

export interface IRatingsIndexedByMovieId {
    [index: string]: number
}
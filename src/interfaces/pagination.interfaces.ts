import { MovieRead } from "./moviesInterfaces";

type Pagination = {
    prevPage: string | null;
    nextPage: string | null;
    count: number;
    data: MovieRead
}

type PaginationParams = {
    page: number;
    perPage: number;
    order: string;
    sort: string;
    prevPage?: string | null;
    nextPage?: string | null;
}

export { Pagination, PaginationParams }
export interface IMovie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
}

export interface queryResponse {
    results: IMovie[];
    total_pages: number;
    total_results: number;
    page: number;
}

export interface pageData {
    total_pages: number;
    total_results: number;
    page: number;
}
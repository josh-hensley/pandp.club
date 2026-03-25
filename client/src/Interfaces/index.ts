export interface IMovie {
    id: number;
    title: string;
    overview?: string;
    selectedBy?: string;
    poster_path: string;
    release_date: string;
}

export interface ISelection {
    movieId: number;
    selectedBy?: string;
    comments?: string[];
}

export interface IPost {
    title: string;
    text: string;
    comments: string[];
}

export interface IQueryResponse {
    results: IMovie[];
    total_pages: number;
    total_results: number;
    page: number;
}

export interface IPageData {
    total_pages: number;
    total_results: number;
    page: number;
}

export interface IUser {
    username: string;
    queue: number[];
}

export interface AccountCreationData {
    email: string;
    username: string;
    password: string;
    verification: string;
}
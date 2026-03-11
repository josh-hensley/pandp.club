import { Schema, Document } from 'mongoose';
interface IFilm extends Document {
    selectedBy: string;
    movieId: string;
    comments: string[];
}
declare const Film: import("mongoose").Model<IFilm, {}, {}, {}, Document<unknown, {}, IFilm, {}, import("mongoose").DefaultSchemaOptions> & IFilm & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, Schema<IFilm, import("mongoose").Model<IFilm, any, any, any, Document<unknown, any, IFilm, any, {}> & IFilm & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IFilm, Document<unknown, {}, import("mongoose").FlatRecord<IFilm>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<IFilm> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>>;
interface IPreviousFilms extends Document {
    films: IFilm[];
}
declare const PreviousFilms: import("mongoose").Model<IPreviousFilms, {}, {}, {}, Document<unknown, {}, IPreviousFilms, {}, import("mongoose").DefaultSchemaOptions> & IPreviousFilms & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, Schema<IPreviousFilms, import("mongoose").Model<IPreviousFilms, any, any, any, Document<unknown, any, IPreviousFilms, any, {}> & IPreviousFilms & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IPreviousFilms, Document<unknown, {}, import("mongoose").FlatRecord<IPreviousFilms>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<IPreviousFilms> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>>;
export { Film, PreviousFilms };
//# sourceMappingURL=PreviousFilms.d.ts.map
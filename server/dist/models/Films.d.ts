import { Schema, Document } from 'mongoose';
interface IFilm extends Document {
    selectedBy: string;
    movieId: string;
    comments?: string[];
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
export default Film;
//# sourceMappingURL=Films.d.ts.map
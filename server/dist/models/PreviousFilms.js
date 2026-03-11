import { Schema, model, Document } from 'mongoose';
const filmSchema = new Schema({
    selectedBy: String,
    movieId: String,
    comments: [String]
});
const Film = model('Film', filmSchema);
const previousFilmsSchema = new Schema({
    films: [filmSchema],
}, {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
});
const PreviousFilms = model('PreviousFilms', previousFilmsSchema);
export { Film, PreviousFilms };
//# sourceMappingURL=PreviousFilms.js.map
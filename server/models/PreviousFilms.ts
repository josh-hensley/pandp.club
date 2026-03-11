import { Schema, model, Document } from 'mongoose';

interface IFilm extends Document {
    selectedBy: string;
    movieId: string;
    comments: string[];
}

const filmSchema = new Schema<IFilm>({
  selectedBy: String,
  movieId: String,
  comments: [String]
})

const Film = model('Film', filmSchema)

interface IPreviousFilms extends Document {
  films: IFilm[];
}

const previousFilmsSchema = new Schema<IPreviousFilms>({
    films: [Film],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const PreviousFilms = model('PreviousFilms', previousFilmsSchema);

export { Film, PreviousFilms }

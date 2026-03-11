import { Schema, model, Document } from 'mongoose';

interface IFilm extends Document {
    selectedBy: string;
    movieId: string;
    comments?: string[];
}

const filmSchema = new Schema<IFilm>({
  selectedBy: String,
  movieId: {
    type: String,
    required: true
  },
  comments: [String]
})

const Film = model('Film', filmSchema)

export default Film

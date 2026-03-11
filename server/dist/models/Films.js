import { Schema, model, Document } from 'mongoose';
const filmSchema = new Schema({
    selectedBy: String,
    movieId: {
        type: String,
        required: true
    },
    comments: [String]
});
const Film = model('Film', filmSchema);
export default Film;
//# sourceMappingURL=Films.js.map
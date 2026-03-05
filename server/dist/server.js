import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
const { URI, PORT } = process.env;
const app = express();
const connectDb = async () => {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        if (URI) {
            await mongoose.connect(URI);
            await mongoose.connection.db?.admin().command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
    }
    finally {
        // Ensures that the client will close when you finish/error
        await mongoose.disconnect();
    }
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, '../../client/dist')));
app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    res.send(`User - ${id}`);
});
app.get(/(.*)/, (_req, res) => {
    res.sendFile(path.join(import.meta.dirname, '../../client/dist', 'index.html'));
});
app.listen(PORT, async () => {
    await connectDb();
    console.log(`Listening on port: ${PORT}`);
});
//# sourceMappingURL=server.js.map
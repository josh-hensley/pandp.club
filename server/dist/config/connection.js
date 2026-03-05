import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
const URI = process.env.URI || '';
const db = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database connected.');
        return mongoose.connection;
    }
    catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Database connection failed.');
    }
};
export default db;
//# sourceMappingURL=connection.js.map
import jwt from 'jsonwebtoken';
export const signToken = (username, _id) => {
    // Create a payload with the user information
    const payload = { username, _id };
    const secretKey = process.env.JWT_SECRET_KEY; // Get the secret key from environment variables
    // Sign the token with the payload and secret key, and set it to expire in 2 hours
    return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};
//# sourceMappingURL=auth.js.map
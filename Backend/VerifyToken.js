const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log("JWT token from header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json("You are not authorized. Token is missing.");
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.seckey, (err, user) => {
        if (err) {
            console.log("JWT verification error:", err);
            return res.status(401).json("Token is not valid.");
        }

        // Debug: Log the payload returned by jwt.verify
        console.log("Payload from token:", user);

        // Check if the user object exists and has the id property
        if (!user || !user.id) {
            console.log("Token does not contain expected 'id' field");
            return res.status(400).json("Token payload is not valid.");
        }

        if (user.id !== req.params.id) {
            console.log('User ID and token ID mismatch');
            return res.status(403).json("Your ID and token ID mismatch.");
        }

        // Attach the verified user to the request object
        req.user = user;

        // Continue to the next middleware or route handler
        next();
    });
};

module.exports = verifyToken;

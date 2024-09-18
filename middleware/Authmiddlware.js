const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log(`Authorization header is missing`);
        return res.sendStatus(401); 
    }
    
    const token = authHeader.split(' ')[1];

    if (!token) {
        console.log(`Token is missing`);
        return res.sendStatus(401); 
    }

    console.log(`Verifying token`);
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                console.error(`Token expired`);
                return res.status(401).json({ error: 'Token expired' });
            } else {
                console.error(`Token verification failed: ${err.message}`);
                return res.status(403).json({ error: 'Invalid token' });
            }
        }

        if (!decoded || !decoded.id) {
            console.log(`Decoded token is missing id`);
            return res.sendStatus(403);
        }

        req.userId = decoded.id;
        req.email = decoded.email;
        next();
    });
};

module.exports = { verifyToken };

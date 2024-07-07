const jwt = require('jsonwebtoken');
 
const secretKey = 'AAK';
 
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
 
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
 
    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
}
 
module.exports = verifyToken;
const jwt = require('jsonwebtoken');

const secretKey = 'AAK';

function generateToken(user) {
    const payload = {
        userId: user.id,

    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '3h' }); 
    return token;
}

module.exports = generateToken;
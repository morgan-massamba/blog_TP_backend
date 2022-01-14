const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.headers);
        const token = req?.headers['authorization']?.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');
        console.log('decoced token', decoded);
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({ message: 'jwt invalid' });
    }
};

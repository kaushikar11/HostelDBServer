const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token payload to req.user
        console.log(req.user);
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
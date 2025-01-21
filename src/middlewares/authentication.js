"use strict"

// app.use(authentication):

const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: true, message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    // console.log(token);
    try {
        // Token'ı doğrula
        const decoded = jwt.verify(token, process.env.ACCESS_KEY);
        req.user = decoded; // Kullanıcı bilgilerini req.user'a ekle
        next(); // Sonraki middleware'e geç
    } catch (err) {
        return res.status(403).json({ error: true, message: "Invalid token." });
    }
   
}
module.exports = authenticateUser;
const express = require('express');
const jwt = require('jsonwebtoken');
const secretKey = "2809a95eedde5863d8e8e3bea5205cd62d290b10a3769afee677b8754a4d05b7"

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Authorization required' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };

module.exports = authMiddleware;
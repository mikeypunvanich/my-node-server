const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET all users
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

// CREATE new user
router.post('/', (req, res) => {
    const { name, email } = req.body;
    db.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [name, email],
        (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ message: 'User created', id: result.insertId });
            }
        }
    );
});

module.exports = router;

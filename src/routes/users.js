// src/routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../db/db');

// GET all users
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE new user
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            'SELECT * FROM users WHERE id = $1',
            [id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE user by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query(
            'DELETE FROM users WHERE id = $1',
            [id]
        );
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

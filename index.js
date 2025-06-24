const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());

app.get('/Games', async (_, res) => {
    try {
        const games = await pool.query('SELECT FROM tb_console');
        res.status(200).json(games.rows);
    } catch (err) {
        console.error('Erro ao buscar consoles', err);
    }
});


app.post('/Games', async (req, res) => {
    
})
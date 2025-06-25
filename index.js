const express = require('express');
const app = express();
const pool = require('./database/db');

app.use(express.json());

app.get('/Games', async (_, res) => {
    try {
        const games = await pool.query('SELECT * FROM tb_console');
        res.status(200).json(games.rows);
    } catch (err) {
        console.error('Erro ao buscar consoles', err);
    }
});


app.post('/Games', async (req, res) => {
    const { name, launch_date } = req.body;
    try {
        const games = await pool.query (
            'INSERT INTO tb_console (name, launch_date) VALUES ($1, $2) RETURNING *',
            [name, launch_date]
        );
        res.status(200).json(games.rows[0]);
    } catch (err) {
        console.error('Erro ao criar console', err);
        res.status(500).json({ error: 'Erro ao criar o console'})
    }
});

app.put('/Games/:id', async (req, res) => {
    const{id} = req.params;
    const { name, launch_date } = req.body;

    try {
        const games = await pool.query(
            'UPDATE tb_console SET name = $1, launch_date = $2 WHERE id = $3 RETURNING *',
            [name, launch_date]
        );

        if (games.rowCount === 0) {
            return res.status(404).json({ error: 'Console não encontrado'});
        } 

        res.status(200).json(games.row[0]);
    } catch (err) {
        console.error('Erro ao atualizar console:', err);
        res.status(500).json({ error: 'Erro ao atuaizar a tarefa'});
    }
});

app.delete('/Games/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const games = await pool.query('DELETE FROM tb_console WHERE id = $1 RETURNING *', [id]);
        if (games.rowCount === 0) {
            return res.status(404).json({ error: 'Console não encontrado'});
        }

        res.status(200).json({ message: 'Console excluido com sucesso'});
    } catch (err) {
        console.error('Erro ao excluir Console:', err);
        res.status(500).json({ error: 'Erro ao exluir o Console'});
    }
});


const PORT = 3000
app.listen(PORT, () => {
    console.log("servidor iniciado")
})
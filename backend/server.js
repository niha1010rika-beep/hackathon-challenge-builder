const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Niha@123',
    database: 'hackathon_builder'
});

// Get all challenges
app.get('/challenges', (req, res) => {
    db.query('SELECT * FROM challenges ORDER BY challenge_id', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Database Error');
        } else {
            res.json(result);
        }
    });
});

// Add challenge
app.post('/challenges', (req, res) => {
    const {
        challenge_id,
        title,
        description,
        category,
        difficulty,
        points,
        evaluation_criteria
    } = req.body;

    db.query(
        `INSERT INTO challenges
        (challenge_id, title, description, category, difficulty, points, evaluation_criteria)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            challenge_id,
            title,
            description,
            category,
            difficulty,
            points,
            evaluation_criteria
        ],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Insert Failed');
            } else {
                res.send('Challenge Added Successfully');
            }
        }
    );
});

// Delete challenge
app.delete('/challenges/:id', (req, res) => {
    const id = req.params.id;

    db.query(
        'DELETE FROM challenges WHERE challenge_id = ?',
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Delete Failed');
            } else {
                res.send('Challenge Deleted');
            }
        }
    );
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

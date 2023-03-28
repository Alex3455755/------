const express = require("express");
const app = express();
const jsonParser = express.json();
const path = require('path');
const mysql = require("mysql2");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = 'bipE';

/* const connection = mysql.createConnection({
    host: "192.168.0.52",
    user: "laptop",
    database: "Quiz",
    password: "MySql:65108bipE;"
}); */

app.post('/signIn', jsonParser, (req, res) => {
    const passwordInput = req.body.password;
    const login = req.body.login;
    const token = jwt.sign({ name: login, role: 'user' }, secret, { expiresIn: '10min' });
    connection.query('SELECT name,password FROM users WHERE name=?', [login], (err, data) => {
        if (data.length !== 0) {
            argon2.verify(data[0].password, passwordInput)
                .then((val) => {
                    if (val) {
                        const token = jwt.sign({ name: login, role: data[0].role, }, secret, { expiresIn: '10min' });
                        res.json({ error: false, jwt: token, name: login });
                    }
                    else {
                        res.json({ error: true, message: "неверный пароль" });
                    }
                });
        }else{
            res.json({ error: true, message: "Не зарегестрирован пользователь под таким логином" });
        }
    });
});

app.post('/createQuiz',jsonParser,(req,res)=>{
    console.dir(req.body.quizList[0].variants);
});

app.post('/signUp', jsonParser, (req, res) => {
    console.log(req.body)
    const password = req.body.password;
    const login = req.body.login;
    connection.query('SELECT id FROM users WHERE name=?', [login], (err, data) => {
        if (data.length !== 0) {
            res.json({ error: true, message: "Пользователь с таким логином уже существует" });
        } else {
            newPas = argon2.hash(password)
                .then((val) => {
                    connection.query('INSERT INTO users(name,password) VALUE(?,?)', [login, val]);
                });
            const token = jwt.sign({ name: login, role: 'user' }, secret, { expiresIn: '10min' });
            res.json({ jwt: token, name: login, role: 'user', error: false });
        }
    });
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'quiz/public/index.html'));
});


const PORT = 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
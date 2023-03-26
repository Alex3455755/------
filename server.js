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
    const password = req.body.password;
    const login = req.body.login;
    const token = jwt.sign({ name: login, role: 'user' }, secret, { expiresIn: '10min' });
    res.json({ error: true,message: 'Неверный пароль или логин' })
    console.log(req.body);
});

app.post('/signUp', jsonParser, (req, res) => {
    console.log(req.body)
    const password = req.body.password;
    const login = req.body.login;
    const token = jwt.sign({ name: login, role: 'user' }, secret, { expiresIn: '10min' });
    res.json({ jwt: token, name: login, role: 'user', error: false })
    console.log(req.body);
})

/* connection.query('SELECT * FROM users',(err,data)=>{
    console.log(data);
}); */


app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'quiz/public/index.html'));
});


const PORT = 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
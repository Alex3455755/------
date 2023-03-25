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

app.post('/form', jsonParser, (req, res) => {
    console.log(req.body);
    res.json({mesage: 'ok'});
});

/* connection.query('SELECT * FROM users',(err,data)=>{
    console.log(data);
}); */


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/app/public/index.html'));
});


const PORT = 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
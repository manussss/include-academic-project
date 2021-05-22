const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
app.use(cors());
app.use(express.json());

// Configura a porta do servidor e coloca em execução
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(porta);

// Cria a conexão do mysql e faz a conexão
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user', // Colocar seu usuário
    password: 'Abc12345', // Colocar sua senha
    database: 'include'
});

connection.connect((err) => {
    if(err) {
        console.log(err.stack);
        return;
    }

    console.log('Conneção Ok');
});

// CRUD

// Create(Criar)
app.post('/notas', (req, res) => {
    const { nome, descricao, valorMonetario, tipo } = req.body;
    const query = "INSERT INTO notas VALUES (0, '" + nome + "', '" + descricao + "', " + valorMonetario + ", " + tipo + ");"
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        return res.sendStatus(201);
    });
});

// Read(Ler)
app.get('/notas', (req, res, next) => {
    connection.query('SELECT * FROM notas', (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        let notas = [];
        for (i of result) {
            notas.push(i);
        }
        return res.send(notas);
    });
});

app.get('/notas/:id', (req, res, next) => {
    let query = 'SELECT * FROM notas WHERE idNota=' + req.params.id
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        let notas = result;
        return res.send(notas);
    });
});

// Update(Atualizar)
app.put('/notas/:id', (req, res, next) => {
    let query = "UPDATE notas SET nome='" + req.body.nome 
    + "', descricao='" + req.body.descricao 
    + "', valorMonetario=" + req.body.valorMonetario 
    + ", tipo=" + req.body.tipo 
    + " WHERE idNota=" + req.params.id
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        return res.sendStatus(201);
    });
});

// Delete(Excluir)
app.delete('/notas/:id', (req, res) => {
    let query = 'DELETE FROM notas WHERE idNota=' + req.params.id
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        return res.sendStatus(200);
    });
});
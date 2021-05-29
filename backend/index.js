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
app.post('/extratos', (req, res) => {
    const { nome, descricao, valorMonetario, tipo } = req.body;
    const tipoInt = 0;
    if(tipo) {
        tipoInt = 1;
    }
    const query = "INSERT INTO extratos VALUES (0, '" + nome + "', '" + descricao + "', " + valorMonetario + ", " + tipoInt + ");"
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        return res.sendStatus(201);
    });
});

// Read(Ler)
app.get('/extratos', (req, res, next) => {
    connection.query('SELECT * FROM extratos', (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        let extratos = [];
        for (i of result) {
            if (i.tipo === 0){
                i.tipo = false;
            }
            else if (i.tipo === 1){
                i.tipo = true;
            }
            extratos.push(i);
        }
        return res.send(extratos);
    });
});

app.get('/extratos/:id', (req, res, next) => {
    let query = 'SELECT * FROM extratos WHERE idExtrato=' + req.params.id
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        let extratos = result;
        return res.send(extratos);
    });
});

// Update(Atualizar)
app.put('/extratos/:id', (req, res, next) => {
    const tipoInt = 0;
    if(req.body.tipo) {
        tipoInt = 1;
    }
    let query = "UPDATE extratos SET nome='" + req.body.nome 
    + "', descricao='" + req.body.descricao 
    + "', valorMonetario=" + req.body.valorMonetario 
    + ", tipo=" + tipoInt 
    + " WHERE idExtrato=" + req.params.id
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        return res.sendStatus(201);
    });
});

// Delete(Excluir)
app.delete('/extratos/:id', (req, res) => {
    let query = 'DELETE FROM extratos WHERE idExtrato=' + req.params.id
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.sendStatus(400);
        }
        return res.sendStatus(200);
    });
});
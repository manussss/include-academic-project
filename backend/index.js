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
app.post('/extrato', (req, res) => {
    const { nome, descricao, valor, tipo, data } = req.body;
    let tipoInt = 0;
    if(tipo) {
        tipoInt = 1;
    }
    const query = "INSERT INTO extratos VALUES (0, '" + nome + "', '" + descricao + "', " + valor + ", " + tipoInt + ", '" + data + "');"
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.send("Erro ao cadastrar extrato!");
        }
        return res.status(201);
    });
});

// Read(Ler)
app.get('/extratos', (req, res, next) => {
    connection.query('SELECT * FROM extratos', (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.send("Erro ao acessar extratos!");
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
            return res.send("Erro ao buscar extrato!");
        }
        let extratos = result;
        return res.send(extratos);
    });
});

// Update(Atualizar)
app.put('/extratos/:id', (req, res, next) => {
    let tipoInt = 0;
    if(req.body.tipo) {
        tipoInt = 1;
    }
    let data = new Date(req.body.data)
    let query = "UPDATE extratos SET nome='" + req.body.nome 
    + "', descricao='" + req.body.descricao 
    + "', valor=" + req.body.valor 
    + ", tipo=" + tipoInt 
    + ", data='" + data.toISOString().split('T')[0]
    + "' WHERE idExtrato=" + req.params.id
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.send("Erro ao atualizar extrato!");
        }
        return res.status(201);
    });
});

// Delete(Excluir)
app.delete('/extratos/:id', (req, res) => {
    let query = 'DELETE FROM extratos WHERE idExtrato=' + req.params.id
    connection.query(query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return res.send("Erro ao excluir extrato!");
        }
        return res.status(200);
    });
});
const mysql = require('mysql2')

    //Conecta ao banco de dados

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lista'
})

module.exports = conexao
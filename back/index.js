const express = require('express');
const app = express();
const tarefasRoutes = require('./routes/tarefas');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/tarefas', tarefasRoutes);

    //Me informa que o servidor está ligado
app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})
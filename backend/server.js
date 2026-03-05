const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const projetos = [
    { id: 1, titulo: "Sistema de Gestão", tecnologia: "Node & React", link: "#" },
    { id: 2, titulo: "App de Clima", tecnologia: "JavaScript & API", link: "#" }
];

app.get('/api/projetos', (req, res) => {
    res.json(projetos);
});

app.listen(5000, () => console.log("Servidor API rodando na porta 5000"));
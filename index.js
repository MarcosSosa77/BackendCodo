/*--------SERVIDOR ESTATICO CON EXPRESS-------*/

const express = require('express');
const app = express();
let port = 3000;

const usuariosRouter = require('./routes/usuarios');

app.use(express.json());

app.use('/usuarios',usuariosRouter);

app.get('/', (req,res) => 
{
    res.send('HOLA DESDE EL PUERTO LOCALHOST:3000');
});

app.listen(port , () => 
{
    console.log(`Servidor ejecutandose en el puert ${port}`)
});


















/*
app.get("/", (req,res) => 
{
    //enviar solo un mensaje (texto plano)
    //res.send('CHAU CHAU desde un SERVIDOR DE EXPRESS  Y PROBANDOSE CON NODEMON');

    //enviar un SOLO archivo
    //res.sendFile(__dirname + '/public/index.html');
    //res.sendFile(__dirname + '/public/estilos.css');

});
*/
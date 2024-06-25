const express = require('express');
const app = express();
const usuariosRouter = require('./routes/usuarios');
const PORT = process.env.PORT || 3000;
const path = require('path'); // Importa el módulo path



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use(express.json());


app.use('/usuarios', usuariosRouter);

// Middleware para servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, () =>
{
    console.log(`Servidor corriendo en ${PORT}`);
});

app.get('/',(req,res)=> 
{
    res.send('server funcionando con express');
});
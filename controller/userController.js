const db = require('../db/db');
const multer = require('multer');
const path = require('path');



// Configuración de multer base de datos
//const storage = multer.memoryStorage(); // Usamos memoryStorage para obtener el buffer del archivo
//const upload = multer({ storage: storage });


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Indica la carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo en el disco
    }
});

const upload = multer({ storage: storage });






const ObtenerTodosLosUsuarios = (req, res) =>
{
    const sql = 'SELECT * FROM usuarios';
    db.query(sql,(err,results) =>
    {
        if(err) throw err;

        res.json(results);
    });

};

const obtenerUsuarioPorId = (req, res) =>{
    const {id} = req.params;
    const sql = 'SELECT * FROM usuarios WHERE id = ?';
    
    db.query(sql,[id], (err,result) => 
    {
        if(err) throw err;        
        res.json(result);
    });

};


/*

const CrearUsuario = (req, res) =>{
    const {nombre,apellido,mail} = req.body;

    const sql = 'INSERT INTO usuarios (nombre,apellido,mail) VALUES (?,?,?)';

    db.query(sql,[nombre,apellido,mail], (err,result) =>
    {
        if(err) throw err;

        res.json({
                    mensaje : 'Usuario Creado', 
                    idUsuario: result.insertId
                });
    });
};
*/

const CrearUsuario = (req, res) => {
    const { nombre, apellido, mail } = req.body;
    const archivo = req.file ? req.file.filename : null; // Obtener el nombre del archivo guardado

    const sql = 'INSERT INTO usuarios (nombre, apellido, mail, ruta_archivo) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre, apellido, mail, archivo], (err, result) => {
        if (err) throw err;
        res.json({
            mensaje: 'Usuario Creado',
            idUsuario: result.insertId
        });
    });
};



/*
const ActualizarUsuario = (req, res) =>{
    const {id} = req.params;
    const {nombre,apellido,mail} = req.body;

    const sql = 'UPDATE usuarios SET nombre = ?, apellido = ?, mail = ? WHERE id = ?';
    db.query(sql,[nombre,apellido,mail,id], (err,result) =>
    {
        if(err) throw err;

        res.json(
            {
                message : 'Usuario editado'
            });
    });

};

*/


const ActualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, mail } = req.body;
    const ruta_archivo = req.file ? req.file.filename : null; // Obtener el nombre del archivo guardado si se proporcionó uno nuevo

    // Construir la consulta SQL para actualizar el usuario
    const sql = `
        UPDATE usuarios 
        SET nombre = ?, apellido = ?, mail = ?, ruta_archivo = ?
        WHERE id = ?
    `;
    const params = [nombre, apellido, mail, ruta_archivo, id];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            res.status(500).json({ message: 'Error al actualizar usuario' });
        } else {
            res.json({ message: 'Usuario actualizado correctamente' });
        }
    });
};



const BorrarUsuario = (req, res) =>{
    const {id} = req.params;
    const sql  = 'DELETE FROM usuarios WHERE id= ?';
    db.query(sql,[id],(err,result) =>
    {
        if(err) throw err;

        res.json(
            {
                message: 'Usuario eliminado'
            });
    });

};


module.exports = 
{
    ObtenerTodosLosUsuarios,
    obtenerUsuarioPorId,
    CrearUsuario,
    ActualizarUsuario,
    BorrarUsuario,
    upload 
}
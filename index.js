//modulos
const express = require('express');
const db = require('./db/conexion');
const fs = require('fs') //Permite trabajar con archivos (file system) incluida con node, no se instala
const cors = require('cors');
require('dotenv/config')
const app = express();
const port = 3000

//Middleware
app.use(express.json())
app.use(express.static('./public')) //Ejecuta directamente el front al correr el servidor
app.use(cors())


app.get('/productos', (req, res) => {
    // res.send('Listado deF productos')

    const sql = "SELECT * FROM productos"
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error de lectura")
            return
        }
        res.json(result)
    })

    //    const datos= leerDatos();
    //    res.json(datos.productos);
})

app.get('/productos/:id', (req, res) => {
    //res.send('Buscar producto por ID')
    const datos = leerDatos();
    const prodEncontrado = datos.productos.find((p) => p.id == req.params.id)
    if (!prodEncontrado) { // ! (no) o diferente
        return res.status(404).json(`No se encuentra el producto`)
    }
    res.json({
        mensaje: "producto encontrado",
        producto: prodEncontrado
    })
})

app.post('/productos', (req, res) => {
    //res.send('Guardando nuevo producto')
    console.log(req.body)
    console.log(Object.values(req.body))
    const values = Object.values(req.body)
    const sql = "INSERT INTO productos (imagen, titulo, descripcion, precio) VALUES (?,?,?,?)"

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al guardar')
            return
        }
        res.json({ mensaje: "Nuevo producto agregado" })
    })
})

app.put('/productos', (req, res) => {
    const values = Object.values(req.body);
    console.log(values)
    const sql = "UPDATE productos SET titulo=?, imagen=?, descripcion=?, precio=? WHERE id=?";


    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al modificar registro');
            return;

        }
        res.json({
            mensaje: 'Producto Actualizado',
            data: result
        })

    })

})

app.delete('/productos/:id', (req, res) => {
    // res.send('Eliminando Producto')
    const id = req.params.id
    const sql = ("DELETE FROM productos WHERE id= ?")
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error al borrar')
            return;
        }
        console.log(result)
        res.json({ mensaje: "Producto eliminado" })
    })

})


app.post('/login', (req, res) => {
    const { correo, contraseña } = req.body;

    const query = 'SELECT id FROM usuarios WHERE correo = ? AND contrasena = ?';
    db.query(query, [correo, contraseña], (err, results) => { // Cambia conexion por db
        if (err) {
            console.error('Error al realizar la consulta:', err); 
            return res.status(500).json({ message: 'Error en el servidor.' });
        }

        if (results.length > 0) {
            const user = results[0];
            // Redirige según el ID del usuario
            return res.json({
                message: 'Inicio de sesión exitoso.',
                redirectTo: user.id === 1 ? '/productosAdmin.html' : '/productos.html',
            });
        }

        // Si las credenciales son incorrectas
        res.status(401).json({ message: 'Usuario o contraseña incorrectos.' });
    });
});

app.post('/register', (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    // Verifica si el correo ya existe en la base de datos
    const checkQuery = 'SELECT id FROM usuarios WHERE correo = ?';
    db.query(checkQuery, [correo], (err, results) => {
        if (err) {
            console.error('Error al verificar el correo:', err);
            return res.status(500).json({ message: 'Error en el servidor.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado.' });
        }

        // Inserta el nuevo usuario en la base de datos
        const insertQuery = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
        db.query(insertQuery, [nombre, correo, contraseña], (err) => {
            if (err) {
                console.error('Error al registrar el usuario:', err);
                return res.status(500).json({ message: 'Error en el servidor.' });
            }

            res.status(201).json({ message: 'Usuario registrado exitosamente.' });
        });
    });
});

app.post('/cambiar-contrasena', (req, res) => {
    const { correo, contrasenaActual, nuevaContrasena } = req.body;
  
    // Verificar contraseña actual
    const query = 'SELECT Contrasena FROM usuarios WHERE correo = ?';
    db.query(query, [correo], (err, results) => {
      if (err) return res.status(500).send('Error en el servidor');
      if (results.length === 0) return res.status(400).send('Usuario no encontrado');
      if (results[0].Contrasena !== contrasenaActual) {
        return res.status(400).send('Contraseña actual incorrecta');
      }
  
      // Actualizar con la nueva contraseña
      const updateQuery = 'UPDATE usuarios SET contrasena = ? WHERE Correo = ?';
      db.query(updateQuery, [nuevaContrasena, correo], (err) => {
        if (err) return res.status(500).send('Error al actualizar la contraseña');
        res.send('Contraseña actualizada exitosamente');
      });
    });
  });
  
  app.post('/eliminar-cuenta', (req, res) => {
    const { correo } = req.body;
  
    const query = 'DELETE FROM usuarios WHERE correo = ?';
    db.query(query, [correo], (err, results) => {
      if (err) return res.status(500).send('Error en el servidor');
      if (results.affectedRows === 0) return res.status(400).send('Usuario no encontrado');
      res.send('Cuenta eliminada exitosamente');
    });
  });
  

  app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});

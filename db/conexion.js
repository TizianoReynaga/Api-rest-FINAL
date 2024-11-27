const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST || "localhost",
    user: process.env.MYSQL_ADDON_USER || "root",
    password: process.env.MYSQL_ADDON_PASSWORD || "",
    database: process.env.MYSQL_ADDON_DB || "tienda",  // Cambia 'tienda' por el nombre de tu base de datos si es necesario
    port: process.env.MYSQL_ADDON_PORT || 3006,  // Asegúrate de usar el puerto correcto, por defecto es 3306
    connectionLimit: 5
});

// const conexion = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'tienda',
// });


conexion.connect((err) => {
    if (err) {
        console.error("Error de conexión:", err);
        return;
    }
    console.log("Conectados");
});

module.exports = conexion;


//require('dotenv').config();
//npm install dotenv (si es necesario)

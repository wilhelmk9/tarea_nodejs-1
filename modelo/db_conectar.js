// Importar el módulo MySQL para la conexión a la base de datos
import mysql from 'mysql';

// Crear una instancia de conexión con la base de datos
var conectar = mysql.createConnection({
    host: 'localhost',        // Dirección del servidor de la base de datos
    user: 'root',             // Nombre de usuario para la conexión
    password: '0000',         // Contraseña para la conexión
    database: 'colegio',   // Nombre de la base de datos a la que se va a conectar
    port: 3306                // Puerto en el que el servidor de la base de datos está escuchando
});

// Establecer la conexión con la base de datos
conectar.connect(function(err) {
    if (err) {
        console.error('Error en la conexión: ' + err.stack);
        return;
    }

    console.log('Conexión exitosa. ID de conexión: ' + conectar.threadId);
});

// Exportar la instancia de conexión para que esté disponible en otros archivos
export { conectar };

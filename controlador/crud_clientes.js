// Importar la función de conexión desde el archivo "../modelo/db_conectar.js"
import { conectar } from "../modelo/db_conectar.js";

// Objeto para las operaciones CRUD de clientes
var crud_cliente = {};


// Función para leer los registros de clientes desde la base de datos y renderizarlos en una vista
crud_cliente.leer = (req, res) => {
    conectar.query('SELECT * FROM tipos_sangre', (errorTiposSangre, resultadosTiposSangre) => {
        if (errorTiposSangre) {
            throw errorTiposSangre;
        } else {
            conectar.query('SELECT e.id_estudiante, e.carne, e.nombres, e.apellidos, e.direccion, e.telefono, e.correo_electronico, p.sangre,DATE_FORMAT(e.fecha_nacimiento, "%d-%m-%Y") AS fecha_nacimiento FROM estudiantes AS e INNER JOIN tipos_sangre AS p ON e.id_tipo_sangre = p.id_tipo_sangre ORDER BY e.id_estudiante ASC;', (error, results) => {
                if (error) {
                    throw error;
                } else {
                    // Renderizar la vista 'clientes/index' con los resultados de la consulta
                    res.render('clientes/index', { resultado: results, tiposSangre: resultadosTiposSangre });
                }
            });
        }
    });
};




// Función para crear, actualizar o borrar registros de clientes en la base de datos
crud_cliente.cud = (req, res) => {
    // Obtener datos del cuerpo de la solicitud
    const btn_crear = req.body.btn_crear;
    const btn_actualizar = req.body.btn_actualizar;
    const btn_borrar = req.body.btn_borrar;
    const id_estudiante = req.body.txt_id_estudiante;
    const carne = req.body.txt_carne;
    const nombres = req.body.txt_nombres;
    const apellidos = req.body.txt_apellidos;
    const direccion = req.body.txt_direccion;
    const telefono = req.body.txt_telefono;
    const correo_electronico = req.body.txt_correo_electronico;
    const id_tipo_sangre = req.body.txt_id_tipo_sangre;
    const fecha_nacimiento = req.body.txt_fn;

    // Realizar operaciones según el botón presionado
    
    
    if (btn_crear) {
        // Insertar un nuevo registro de cliente en la base de datos
        conectar.query('INSERT INTO estudiantes SET ?', { carne: carne, nombres: nombres, apellidos: apellidos, direccion: direccion, telefono: telefono, correo_electronico: correo_electronico, id_tipo_sangre:id_tipo_sangre,fecha_nacimiento:fecha_nacimiento  }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                // Redirigir de vuelta a la página principal después de la inserción
                res.redirect('/');
            }
        });
    }
    
    if (btn_actualizar) {
        // Actualizar un registro de cliente en la base de datos según su ID
        conectar.query('UPDATE estudiantes SET ? WHERE id_estudiante = ?', [{ carne: carne, nombres: nombres, apellidos: apellidos, direccion: direccion, telefono: telefono, correo_electronico: correo_electronico, id_tipo_sangre:id_tipo_sangre, fecha_nacimiento:fecha_nacimiento }, id_estudiante], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                // Redirigir de vuelta a la página principal después de la actualización
                res.redirect('/');
            }
        });
    }
    
    if (btn_borrar) {
        const id_estudiante = req.body.txt_id_estudiante; // Asegúrate de que estás obteniendo el id_estudiante de manera adecuada desde la solicitud
        // Borrar un registro de cliente en la base de datos según su ID
        conectar.query('DELETE FROM estudiantes WHERE id_estudiante = ?', [id_estudiante], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                // Redirigir de vuelta a la página principal después del borrado
                res.redirect('/');
            }
        });
    }
    
};


// Exportar el objeto "crud_cliente" para que esté disponible en otros archivos
export { crud_cliente };

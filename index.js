// Importar el módulo express para crear una instancia de la aplicación
import express from "express";
// Importar las funciones del controlador para operaciones CRUD de clientes
import { crud_cliente } from "./controlador/crud_clientes.js";

// Crear una instancia de Express
const app_e = express();
// Habilitar el análisis del cuerpo de la solicitud en formato JSON
app_e.use(express.json())
// Habilitar el análisis de datos de formulario codificados en la URL
app_e.use(express.urlencoded({extended:false}))

// Configurar el directorio para archivos estáticos
app_e.use(express.static('./vista'));
app_e.use(express.static('./controlador'));
app_e.use(express.static('./modelo'));

// Configurar el motor de vistas y la ubicación de las vistas
app_e.set('views', './vista');
app_e.set('view engine', 'ejs');

// Iniciar el servidor y escuchar en el puerto 5000
app_e.listen('5000', function () {
    console.log('Aplicacion Iniciada : http://localhost:5000/');
});

// Definir la ruta principal '/' y asociarla a la función de lectura de clientes
app_e.get('/', crud_cliente.leer);
// Definir la ruta para operaciones CRUD de clientes y asociarla a la función cud del controlador
app_e.post('/crud_c', crud_cliente.cud);

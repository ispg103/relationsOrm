// src/routes/userRoutes.js
const expressUser = require('express');
const routerU = expressUser.Router();
const UserController = require('../controller/UserController');

// Obtener todos los usuarios
routerU.get('/users', UserController.getAllUsers); 
// Obtener un usuario por ID
routerU.get('/users/:id', UserController.getUserById);
// Crear una nuevo usuario
routerU.post('/users', UserController.createUser);
// Actualizar un usuario por ID
routerU.put('/users/:id', UserController.updateUser);
// Eliminar un usuario por ID
routerU.delete('/users/:id', UserController.deleteUser);
// Eliminar todos los usuarios
routerU.delete('/users/', UserController.deleteAllUsers);

//Saludar desde los usuarios del Api
routerU.get('/', UserController.sayHelloUsers);

module.exports = routerU;


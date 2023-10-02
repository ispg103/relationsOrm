// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const TaskController = require('../controller/TaskController');

// Obtener todas las tareas
router.get('/tasks',TaskController.getAllTasks); 
// Obtener una tarea por ID
router.get('/tasks/:id', TaskController.getTaskById);
// Crear una nueva tarea
router.post('/tasks', TaskController.createTask);
// Actualizar una tarea por ID
router.put('/tasks/:id', TaskController.updateTask);
// Eliminar una tarea por ID
router.delete('/tasks/:id', TaskController.deleteTask);
// Eliminar todas las tareas
router.delete('/tasks/', TaskController.deleteAllTasks);

//Saludar desde el API
router.get('/', TaskController.sayHello);

module.exports = router;


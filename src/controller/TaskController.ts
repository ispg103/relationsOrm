// src/controllers/TaskController.js
import { AppDataSource } from "../db_config/Connector"
import { Task } from '../entities/Task';

// Obtener todas las tareas
const getAllTasks = async (req, res) => {
  try {    
    const tasks = await AppDataSource.manager.find(Task)
    console.log("Tareas cargadas: ", tasks)
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las tareas.'});
  }
};

// Obtener una tarea por ID
const getTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await AppDataSource.manager.findOne(Task, { where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la tarea.' });
  }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
  const { subject, description, completed } = req.body;
  try {
    const task = AppDataSource.manager.create(Task, {subject, description ,completed});
    await AppDataSource.manager.save(task);
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la tarea.' });
  }
};

// Actualizar una tarea por ID
const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { subject, description, completed } = req.body;
  console.log("new task", subject, description, completed);
  try {    
    const task = await AppDataSource.manager.findOne(Task, { where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }
    task.subject = subject || task.subject;
    task.description = description || task.description;
    task.completed = completed || task.completed;
    console.log("result for save", subject, description, completed);
    await AppDataSource.manager.save(task);
    console.log("Saved!");
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la tarea.' });
  }
};

// Eliminar una tarea por ID
const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await AppDataSource.manager.findOne(Task, { where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada.' });
    }
    await AppDataSource.manager.remove(task);
    res.json({ message: 'Tarea eliminada con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la tarea.' });
  }
};

const deleteAllTasks = async (req, res) => {
  try {
    const entities = AppDataSource.entityMetadatas;
    for (const entity of entities) {
        const repository = AppDataSource.getRepository(entity.name);
        await repository.clear(); // This deletes all rows from the table
    }
    res.json({ message: 'Todo ha sido eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar todas las tareas' });
  }
};

const sayHello = async (req, res) => {
  
  try {
    res.send("Hola desde del API 🎈");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'fallamos amigo' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTasks,
  sayHello
};

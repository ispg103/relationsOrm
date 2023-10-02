import { AppDataSource } from "../db_config/Connector"
import { User } from '../entities/User';

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {    
    const users = await AppDataSource.manager.find(User)
    console.log("Aqui están todos los usuarios: ", users)
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pueden ver los usuarios :('});
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await AppDataSource.manager.findOne(User, { where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'No pudimos encontrar el usuario.' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario.' });
  }
};

const createUser = async (req, res) => {
  const { name, last, email, age } = req.body;
  try {
    const user = AppDataSource.manager.create(User, {name, last ,email, age});
    await AppDataSource.manager.save(user);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el nuevo usuario...' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, last, email, age } = req.body;
  console.log("new user",  name, last, email, age );
  try {    
    const user = await AppDataSource.manager.findOne(User, { where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    user.name = name || user.name;
    user.last = last || user.last;
    user.email = email || user.email;
    user.age = age || user.age;
    console.log("Result for save", name, last, email, age);
    await AppDataSource.manager.save(user);
    console.log("Saved!");
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar tu usuario.' });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await AppDataSource.manager.findOne(User, { where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'Este usuario no esta disponible.' });
    }
    await AppDataSource.manager.remove(user);
    res.json({ message: `Ya borramos a ${user.name} ${user.last}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error borrando al usuario deseado.' });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    const entities = AppDataSource.entityMetadatas;
    for (const entity of entities) {
        const repository = AppDataSource.getRepository(entity.name);
        await repository.clear(); // This deletes all rows from the table
    }
    res.json({ message: 'Todo ha sido eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar todos los usuarios' });
  }
};

const sayHelloUsers = async (req, res) => {
  
    try {
      res.send("Hola desde los usuarios dentro del api ;)");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Todo mal' });
    }
  };

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    deleteAllUsers,
    sayHelloUsers
}
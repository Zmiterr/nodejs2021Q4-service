// const usersRepo = require('./user.memory.repository');
import usersRepo from './user.memory.repository';

// const getAll = () => usersRepo.getAll();

const getAll = async (req, res) => {
  try {
    const users = await usersRepo.getAll();
    res.status(200).send(users);
  } catch (err) {
    throw new Error(err);
  }
};

// const getUserByID = (id) => usersRepo.getUser(id);

const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersRepo.getUser(id);
    res.status(200).send(user);
  } catch (err) {
    throw new Error(err);
  }
};

// const createUser = (user) => usersRepo.createUser(user);
const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const user = await usersRepo.createUser(newUser);
    res.status(201).send(user);
  } catch (err) {
    throw new Error(err);
  }
};

// const deleteUserByID = (id) => usersRepo.deleteUser(id);
const deleteUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersRepo.deleteUser(id);
    res.status(200).send(user);
  } catch (err) {
    throw new Error(err);
  }
};

// const updateUserByID = (id, updateData) => usersRepo.updateUser(id, updateData);
const updateUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const user = await usersRepo.updateUser(id, updateData);
    res.status(200).send(user);
  } catch (err) {
    throw new Error(err);
  }
};

export default {
  getAll,
  getUserByID,
  createUser,
  deleteUserByID,
  updateUserByID,
};

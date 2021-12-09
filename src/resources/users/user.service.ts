import { FastifyReply } from 'fastify';
import usersRepo from './user.memory.repository';

const getAll = async (req, res) => {
  try {
    const users = await usersRepo.getAll();
    res.status(200).send(users);
  } catch (err) {
    throw new Error(String(err));
  }
};

const getUserByID = async (req, res: FastifyReply) => {
  try {
    const { id } = req.params;
    const user = await usersRepo.getUser(id);
    res.status(200).send(user);
  } catch (err) {
    throw new Error(String(err));
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const user = await usersRepo.createUser(newUser);
    res.status(201).send(user);
  } catch (err) {
    throw new Error(String(err));
  }
};

const deleteUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersRepo.deleteUser(id);
    res.status(200).send(user);
  } catch (err) {
    throw new Error(String(err));
  }
};

const updateUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const user = await usersRepo.updateUser(id, updateData);
    res.status(200).send(user);
  } catch (err) {
    throw new Error(String(err));
  }
};

export default {
  getAll,
  getUserByID,
  createUser,
  deleteUserByID,
  updateUserByID,
};

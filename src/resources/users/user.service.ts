import { FastifyReply, FastifyRequest } from 'fastify';
import usersRepo from './user.memory.repository';
import User from './user.model';
import { UserToResponse } from './types';

const getAll = async (_req: FastifyRequest, res: FastifyReply) => {
  try {
    const users = await usersRepo.getAll();
    res.status(200).send(users);
  } catch (err) {
    throw new Error(String(err));
  }
};

const getUserByID = async (
  req: { params: { id: string } },
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    const user = await usersRepo.getUser(id);
    res.status(200).send(user);
  } catch (err) {
    throw new Error(String(err));
  }
};

const createUser = async (req: { body: User }, res: FastifyReply) => {
  try {
    const newUser = req.body;
    const user = await usersRepo.createUser(newUser);
    res.status(201).send(user);
  } catch (err) {
    throw new Error(String(err));
  }
};

const deleteUserByID = async (
  req: { params: { id: string } },
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    const user = await usersRepo.deleteUser(id);
    res.status(200).send(user);
  } catch (err) {
    throw new Error(String(err));
  }
};

const updateUserByID = async (
  req: { params: { id: string }; body: UserToResponse },
  res: FastifyReply
) => {
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

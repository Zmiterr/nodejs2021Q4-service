import { FastifyReply, FastifyRequest } from 'fastify';
import usersRepo from './user.memory.repository';
import User from './user.model';
import { UserToResponse } from './types';

interface IUserIdParam {
  params: { id: string };
}

/**
 * send request all users
 * @param  _req - request void
 * @param  res - response user array
 */
const getAll = async (
  _req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const users = await usersRepo.getAll();
    res.status(200).send(users);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request get user by id
 * @param  req - request user id
 * @param  res - response user
 */
const getUserByID = async (
  req: IUserIdParam,
  res: FastifyReply
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await usersRepo.getUser(id);
    res.status(200).send(user);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request create user
 * @param req - request user object
 * @param res - new user object
 */
const createUser = async (
  req: { body: User },
  res: FastifyReply
): Promise<void> => {
  try {
    const newUser = req.body;
    const user = await usersRepo.createUser(newUser);
    res.status(201).send(user);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request delete user by id
 * @param req - request user id
 * @param res - response user id
 */
const deleteUserByID = async (
  req: IUserIdParam,
  res: FastifyReply
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await usersRepo.deleteUser(id);
    res.status(200).send(user);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request update user by id
 * @param req - request user object
 * @param res - new user object

 */
const updateUserByID = async (
  req: { params: { id: string }; body: UserToResponse },
  res: FastifyReply
): Promise<void> => {
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

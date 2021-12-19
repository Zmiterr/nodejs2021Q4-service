import { FastifyReply, FastifyRequest } from 'fastify';
import usersRepo from './user.memory.repository';
import User from './user.model';
import { UserToResponse } from './types';

export interface Entity {
  id: string;
  boardId?: string;
}

export interface FastifyReq<T = Entity, P = Entity> {
  body: T;
  params: P;
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
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req as FastifyReq;
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
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const { body: newUser } = req as FastifyReq<User>;
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
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req as FastifyReq;
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
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const {
      params: { id },
      body: updateData,
    } = req as FastifyReq<UserToResponse>;
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

import { FastifyReply, FastifyRequest } from 'fastify';
import tasksRepo from './task.memory.repository';
import Task from './task.model';
import { FastifyReq } from '../types';

type IIdParams = FastifyReq<Body, { boardId: string }>;

/**
 * send request het all tasks from board
 * @param req - request task id
 * @param  res - response tasks by board id
 */
const getAll = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const {
      params: { boardId },
    } = req as IIdParams;
    const tasks = await tasksRepo.getAllTasks(boardId);
    res.status(200).send(tasks);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request get task by id
 * @param req - request task id
 * @param res - response task

 */
const getByID = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req as FastifyReq;
    const task = await tasksRepo.getTask(id);
    res.status(200).send(task);
  } catch (err) {
    res.status(404).send();
    throw new Error(String(err));
  }
};

/**
 * send request create task
 * @param req - request task data
 * @param res - response new task

 */
const create = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const {
      params: { boardId },
      body: newData,
    } = req as FastifyReq<Task, { boardId: string }>;
    const task = await tasksRepo.createTask(newData, boardId);
    res.status(201).send(task);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request update task by id
 * @param req - request task data
 * @param res - response edited task
 */
const updateByID = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const {
      params: { id },
      body: newData,
    } = req as FastifyReq<Task>;
    const task = await tasksRepo.updateTask(id, newData);
    res.status(200).send(task);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request delete task by id
 * @param req - request task id
 * @param res - response task id

 */
const deleteByID = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req as FastifyReq;
    const task = await tasksRepo.deleteTask(id);
    res.status(200).send(task);
  } catch (err) {
    throw new Error(String(err));
  }
};

export default { getAll, getByID, create, deleteByID, updateByID };

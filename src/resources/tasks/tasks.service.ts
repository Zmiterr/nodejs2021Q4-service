import { FastifyReply } from 'fastify';
import tasksRepo from './task.memory.repository';
import Task from './task.model';

interface IBoardIdParams {
  params: { boardId: string };
}
interface IIdParams {
  params: { id: string };
}

/**
 * send request het all tasks from board
 * @param {IBoardIdParams} req
 * @param {FastifyReply} res
 * @returns {Promise<void>}
 */
const getAll = async (
  req: IBoardIdParams,
  res: FastifyReply
): Promise<void> => {
  try {
    const { boardId } = req.params;
    const tasks = await tasksRepo.getAllTasks(boardId);
    res.status(200).send(tasks);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request get task by id
 * @param {IIdParams} req
 * @param {FastifyReply} res
 * @returns {Promise<void>}
 */
const getByID = async (req: IIdParams, res: FastifyReply): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await tasksRepo.getTask(id);
    res.status(200).send(task);
  } catch (err) {
    res.status(404).send();
    throw new Error(String(err));
  }
};

/**
 * send request create task
 * @param {{params: {boardId: string}, body: Task}} req
 * @param {FastifyReply} res
 * @returns {Promise<void>}
 */
const create = async (
  req: { params: { boardId: string }; body: Task },
  res: FastifyReply
): Promise<void> => {
  try {
    const { boardId } = req.params;
    const newData = req.body;
    const task = await tasksRepo.createTask(newData, boardId);
    res.status(201).send(task);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request update task by id
 * @param {{params: {id: string}, body: Task}} req
 * @param {FastifyReply} res
 * @returns {Promise<void>}
 */
const updateByID = async (
  req: { params: { id: string }; body: Task },
  res: FastifyReply
): Promise<void> => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const task = await tasksRepo.updateTask(id, newData);
    res.status(200).send(task);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request delete task bu id
 * @param {IIdParams} req
 * @param {FastifyReply} res
 * @returns {Promise<void>}
 */
const deleteByID = async (req: IIdParams, res: FastifyReply): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await tasksRepo.deleteTask(id);
    res.status(200).send(task);
  } catch (err) {
    throw new Error(String(err));
  }
};

export default { getAll, getByID, create, deleteByID, updateByID };

import { FastifyReply } from 'fastify';
import tasksRepo from './task.memory.repository';
import Task from './task.model';

interface requestParams {
  params: { boardId: string };
}
// interface requestParams2 {
//   params: { id: string };
// }
// interface requestParams3 {
//   params: { boardId: string };
//   body: Task;
// }

const getAll = async (req: requestParams, res: FastifyReply) => {
  try {
    const { boardId } = req.params;
    const tasks = await tasksRepo.getAllTasks(boardId);
    res.status(200).send(tasks);
  } catch (err) {
    throw new Error(String(err));
  }
};

const getByID = async (req: { params: { id: string } }, res: FastifyReply) => {
  try {
    const { id } = req.params;
    const task = await tasksRepo.getTask(id);
    res.status(200).send(task);
  } catch (err) {
    res.status(404).send();
    throw new Error(String(err));
  }
};

const create = async (
  req: { params: { boardId: string }; body: Task },
  res: FastifyReply
) => {
  try {
    const { boardId } = req.params;
    const newData = req.body;
    const task = await tasksRepo.createTask(newData, boardId);
    res.status(201).send(task);
  } catch (err) {
    throw new Error(String(err));
  }
};

const updateByID = async (
  req: { params: { id: string }; body: Task },
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const task = await tasksRepo.updateTask(id, newData);
    res.status(200).send(task);
  } catch (err) {
    throw new Error(String(err));
  }
};

const deleteByID = async (
  req: { params: { id: string } },
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    const task = await tasksRepo.deleteTask(id);
    res.status(200).send(task);
  } catch (err) {
    throw new Error(String(err));
  }
};

export default { getAll, getByID, create, deleteByID, updateByID };

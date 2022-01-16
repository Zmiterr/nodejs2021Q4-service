import { getRepository } from 'typeorm';
import Task from './task.model';
import { TaskNoID } from './types';
import User from '../users/user.model';

/**
 * returns all tasks from DB
 * @returns array of Task objects
 */
const getAllTasks = async (boardId: string): Promise<Task[]> =>
  getRepository(Task).find({ boardId });

/**
 * returns task by id from DB
 * @param id - board id
 * @returns Task object
 */
const getTask = async (id: string): Promise<Task | undefined> => {
  const taskByID = getRepository(Task).findOne({ id });
  if (!taskByID) {
    throw new Error(`Task with id ${id} not found`);
  }
  return taskByID;
};

/**
 * creates new task
 * @param task - task data
 * @param board - board id
 * @returns Task object
 */
const createTask = async (task: Task, board: string): Promise<Task> =>
  // TODO create task
  getRepository(Task).save({ ...task, board });
// const newTask = new Task({ ...task, boardId: board });
// inMemoryDB.tasks.push(newTask);
// return newTask;
/**
 * updates task by id
 * @param id - task id
 * @param updateData - task data
 * @returns Task object
 */
const updateTask = async (id: string, updateData: TaskNoID): Promise<Task> => {
  const taskById = await getRepository(Task).findOne(id);
  if (!taskById) {
    throw new Error(`Task with id ${id} not found`);
  }
  const taskForUpdate = { ...taskById, ...updateData };
  return getRepository(User).save(taskForUpdate);
  // const currentTask: Task = inMemoryDB.tasks[taskIndex];
  // const updatedTask = { ...currentTask, ...updateData };
  // inMemoryDB.tasks[taskIndex] = updatedTask;
  // return updatedTask;
};

/**
 * deletes task by id from DB
 * @param id - task id
 * @returns - id deleted task
 */
const deleteTask = async (id: string): Promise<string> => {
  const taskByID = await getRepository(Task).findOne({ id });
  if (!taskByID) {
    throw new Error(`Task with id ${id} not found`);
  } else {
    await getRepository(Task).remove(taskByID);
    return id;
  }
};

export default { getAllTasks, getTask, createTask, deleteTask, updateTask };

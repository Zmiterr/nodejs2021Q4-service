import Task from './task.model';
import { inMemoryDB } from '../../inMemoryDB';
import { TaskNoID } from './types';

/**
 * returns all tasks from DB
 * @returns {Task[]} array of Task objects
 */
const getAllTasks = async (boardId: string): Promise<Task[]> =>
  inMemoryDB.tasks.filter((task: Task) => task.boardId === boardId);
/**
 * returns task by id from DB
 * @param {string} id - board id
 * @returns {Task} Task object
 */

const getTask = async (id: string): Promise<Task> => {
  const taskByID = inMemoryDB.tasks.filter((task: Task) => task.id === id)[0];
  if (!taskByID) {
    throw new Error(`Task with id ${id} not found`);
  }
  return taskByID;
};

/**
 * creates new task
 * @param {Task} task - task data
 * @param {string} board - board id
 * @returns {Task} Task object
 */
const createTask = async (task: Task, board: string): Promise<Task> => {
  const newTask = new Task({ ...task, boardId: board });
  inMemoryDB.tasks.push(newTask);
  return newTask;
};

/**
 * updates task by id
 * @param {string} id - task id
 * @param {TaskNoID} updateData - task data
 * @returns {Task} Task object
 */
const updateTask = async (id: string, updateData: TaskNoID): Promise<Task> => {
  const taskIndex = inMemoryDB.tasks.findIndex((task: Task) => task.id === id);
  if (taskIndex === -1 || !inMemoryDB.tasks[taskIndex]) {
    throw new Error(`Task with id ${id} not found`);
  }
  const currentTask: Task = inMemoryDB.tasks[taskIndex];
  const updatedTask = { ...currentTask, ...updateData };
  inMemoryDB.tasks[taskIndex] = updatedTask;
  return updatedTask;
};

/**
 * deletes task by id from DB
 * @param {string} id - task id
 * @returns {string} - id deleted task
 */
const deleteTask = async (id: string): Promise<string> => {
  if (inMemoryDB.tasks.findIndex((task: Task) => task.id === id) === -1) {
    throw new Error(`Task with id ${id} not found`);
  }
  inMemoryDB.tasks = inMemoryDB.tasks.filter((task: Task) => task.id !== id);
  return id;
};

export default { getAllTasks, getTask, createTask, deleteTask, updateTask };

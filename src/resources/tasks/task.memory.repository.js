const inMemoryDB = require('../../inMemoryDB');
const Task = require('./task.model');

const getAllTasks = async (boardId) =>
  inMemoryDB.tasks.filter((task) => task.boardId === boardId);

const getTask = async (id) => {
  const taskByID = inMemoryDB.tasks.filter((task) => task.id === id)[0];
  if (!taskByID) {
    throw new Error(`Task with id ${id} not found`);
  }
  return taskByID;
};

const createTask = async (task, board) => {
  const newTask = new Task({ ...task, boardId: board });
  inMemoryDB.tasks.push(newTask);
  return newTask;
};

const updateTask = async (id, updateData) => {
  if (inMemoryDB.tasks.findIndex((task) => task.id === id) === -1) {
    throw new Error(`Task with id ${id} not found`);
  }
  const taskIndex = inMemoryDB.tasks.findIndex((task) => task.id === id);
  const currentTask = inMemoryDB.tasks[taskIndex];
  const updatedTask = { ...currentTask, ...updateData };
  inMemoryDB.tasks[taskIndex] = updatedTask;
  return updatedTask;
};

const deleteTask = async (id) => {
  if (inMemoryDB.tasks.findIndex((task) => task.id === id) === -1) {
    throw new Error(`Task with id ${id} not found`);
  }
  inMemoryDB.tasks = inMemoryDB.tasks.filter((task) => task.id !== id);
  return id;
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
};

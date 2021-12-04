const tasksRepo = require('./task.memory.repository');

const getAll = (id) => tasksRepo.getAllTasks(id);

const getByID = (id) => tasksRepo.getTask(id);

const create = (updateData, board) => tasksRepo.createTask(updateData, board);

const updateByID = (id, updateData) => tasksRepo.updateTask(id, updateData);

const deleteByID = (id) => tasksRepo.deleteTask(id);

module.exports = { getAll, getByID, create, deleteByID, updateByID };

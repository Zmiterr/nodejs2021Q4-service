import tasksRepo from './task.memory.repository';

const getAll = async (req, res) => {
  try {
    const { boardId } = req.params;
    const tasks = await tasksRepo.getAllTasks(boardId);
    res.status(200).send(tasks);
  } catch (err) {
    throw new Error(err);
  }
};

const getByID = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await tasksRepo.getTask(id);
    res.status(200).send(task);
  } catch (err) {
    res.status(404).send();
    throw new Error(err);
  }
};

const create = async (req, res) => {
  try {
    const { boardId } = req.params;
    const newData = req.body;
    const task = await tasksRepo.createTask(newData, boardId);
    res.status(201).send(task);
  } catch (err) {
    throw new Error(err);
  }
};

const updateByID = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const task = await tasksRepo.updateTask(id, newData);
    res.status(200).send(task);
  } catch (err) {
    throw new Error(err);
  }
};

const deleteByID = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await tasksRepo.deleteTask(id);
    res.status(200).send(task);
  } catch (err) {
    throw new Error(err);
  }
};

export default { getAll, getByID, create, deleteByID, updateByID };

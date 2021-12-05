const boardsRepo = require('./board.memory.repository');

// const getAll = () => boardsRepo.getAllBoards();
const getAll = async (req, res) => {
  try {
    const boards = await boardsRepo.getAllBoards();
    res.status(200).send(boards);
  } catch (err) {
    throw new Error(err);
  }
};

// const getByID = (id) => boardsRepo.getBoard(id);
const getByID = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await boardsRepo.getBoard(id);
    res.status(200).send(board);
  } catch (err) {
    res.status(404).send();
    throw new Error(err);
  }
};

// const create = (newData) => boardsRepo.createBoard(newData);
const create = async (req, res) => {
  try {
    const newData = req.body;
    const board = await boardsRepo.createBoard(newData);
    res.status(201).send(board);
  } catch (err) {
    throw new Error(err);
  }
};

// const updateByID = (id, newData) => boardsRepo.updateBoard(id, newData);
const updateByID = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const board = await boardsRepo.updateBoard(id, newData);
    res.status(200).send(board);
  } catch (err) {
    throw new Error(err);
  }
};

// const deleteByID = (id) => boardsRepo.deleteBoard(id);
const deleteByID = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await boardsRepo.deleteBoard(id);
    res.status(200).send(board);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { getAll, getByID, create, deleteByID, updateByID };

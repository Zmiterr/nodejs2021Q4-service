const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAllBoards();

const getByID = (id) => boardsRepo.getBoard(id);

const create = (newData) => boardsRepo.createBoard(newData);

const updateByID = (id, newData) => boardsRepo.updateBoard(id, newData);

const deleteByID = (id) => boardsRepo.deleteBoard(id);

module.exports = { getAll, getByID, create, deleteByID, updateByID };

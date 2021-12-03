const inMemoryDB = require('../../inMemoryDB');
const Board = require('./board.model');

const getAllBoards = async () => inMemoryDB.boards;

const getBoard = async (id) => {
  const boardByID = inMemoryDB.boards.filter((board) => board.id === id)[0];
  if (!boardByID) {
    throw new Error(`Board with id ${id} not found`);
  }
  return boardByID;
};

const createBoard = async (board) => {
  const newBoard = new Board(board);
  inMemoryDB.boards.push(newBoard);
  return newBoard;
};

const updateBoard = async (id, updateData) => {
  if (inMemoryDB.boards.findIndex((board) => board.id === id) === -1) {
    throw new Error(`Board with id ${id} not found`);
  }
  const boardIndex = inMemoryDB.boards.findIndex((board) => board.id === id);
  const currentBoard = inMemoryDB.boards[boardIndex];
  const updatedBoard = { ...currentBoard, ...updateData };
  inMemoryDB.boards[boardIndex] = updatedBoard;
  return updatedBoard;
};

const deleteBoard = async (id) => {
  if (inMemoryDB.boards.findIndex((board) => board.id === id) === -1) {
    throw new Error(`Board with id ${id} not found`);
  }
  inMemoryDB.boards = inMemoryDB.boards.filter((board) => board.id !== id);

  // TODO delete user from tasks

  return id;
};

module.exports = {
  getAllBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard,
};

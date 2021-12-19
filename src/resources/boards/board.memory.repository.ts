import Board from './board.model';
import Task from '../tasks/task.model';
import { inMemoryDB } from '../../inMemoryDB';
import { BoardNoID } from './types';

/**
 * returns all boards
 * @returns Board objects
 */
const getAllBoards = async (): Promise<Board[]> => inMemoryDB.boards;

/**
 * returns board by id
 * @param id - board id
 * @returns  Board object
 */
const getBoard = async (id: string) => {
  const boardByID = inMemoryDB.boards.filter(
    (board: Board) => board.id === id
  )[0];
  if (!boardByID) {
    throw new Error(`Board with id ${id} not found`);
  }
  return boardByID;
};

/**
 * creates new board
 * @param board - board data
 * @returns Board object
 */
const createBoard = async (board: Board): Promise<Board> => {
  const newBoard = new Board(board);
  inMemoryDB.boards.push(newBoard);
  return newBoard;
};

/**
 * updates board by id
 * @param id - board id
 * @param updateData - board data
 * @returns Board object
 */
const updateBoard = async (
  id: string,
  updateData: BoardNoID
): Promise<Board> => {
  if (inMemoryDB.boards.findIndex((board: Board) => board.id === id) === -1) {
    throw new Error(`Board with id ${id} not found`);
  }
  const boardIndex = inMemoryDB.boards.findIndex(
    (board: Board) => board.id === id
  );
  const currentBoard: Board = inMemoryDB.boards[boardIndex];
  const updatedBoard = { ...currentBoard, ...updateData };
  inMemoryDB.boards[boardIndex] = updatedBoard;
  return updatedBoard;
};

/**
 * deletes board by id, deletes board tasks from Tasks
 * @param id - board id
 * @returns id deleted board
 */
const deleteBoard = async (id: string): Promise<string> => {
  if (inMemoryDB.boards.findIndex((board: Board) => board.id === id) === -1) {
    throw new Error(`Board with id ${id} not found`);
  }
  inMemoryDB.boards = inMemoryDB.boards.filter(
    (board: Board) => board.id !== id
  );

  inMemoryDB.tasks = inMemoryDB.tasks.filter(
    (task: Task) => task.boardId !== id
  );

  return id;
};

export default {
  getAllBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard,
};

import { getManager, getRepository } from 'typeorm';
import Board from './board.model';
import { BoardNoID } from './types';

/**
 * returns all boards
 * @returns Board objects
 */
const getAllBoards = async (): Promise<Board[]> => getManager().find(Board);

/**
 * returns board by id
 * @param id - board id
 * @returns  Board object
 */
const getBoard = async (id: string) => {
  const board = await getRepository(Board).findOne(id);
  if (!board) {
    throw new Error(`Board with id ${id} not found`);
  }
  return board;
};

/**
 * creates new board
 * @param board - board data
 * @returns Board object
 */
const createBoard = async (board: Board): Promise<Board> =>
  getRepository(Board).save(board);

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
  const boardById = await getRepository(Board).findOne(id);
  if (!boardById) {
    throw new Error(`Board with id ${id} not found`);
  }
  const updatedBoard = { ...boardById, ...updateData };

  return getRepository(Board).save(updatedBoard);
};

/**
 * deletes board by id, deletes board tasks from Tasks
 * @param id - board id
 * @returns id deleted board
 */
const deleteBoard = async (id: string): Promise<Board> => {
  const deletedBoard = await getRepository(Board).findOne(id);

  if (!deletedBoard) {
    throw new Error(`User with id ${id} not found`);
  }

  return getRepository(Board).remove(deletedBoard);
};

export default {
  getAllBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard,
};

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
const getBoard = async (id: string) => getRepository(Board).findOne(id);

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
const deleteBoard = async (id: string): Promise<Board | null> => {
  // const deletedBoard = await getRepository(Board).findOne(id);
  // if (deletedBoard) {
  //   return getRepository(Board).remove(deletedBoard);
  // }
  const repository = getRepository(Board);
  const currentBoard = await repository.findOne(id);

  if (currentBoard) {
    await repository.delete(id);
    return currentBoard;
  }
  return null;
};

export default {
  getAllBoards,
  getBoard,
  createBoard,
  deleteBoard,
  updateBoard,
};

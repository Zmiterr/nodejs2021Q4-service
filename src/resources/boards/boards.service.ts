import { FastifyReply, FastifyRequest } from 'fastify';
import { FastifyReq } from 'resources/types';
import boardsRepo from './board.memory.repository';
import Board from './board.model';

/**
 * send request get all boards
 * @param _req - request void
 * @param res - response all boards
 */
const getAll = async (
  _req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const boards = await boardsRepo.getAllBoards();
    res.status(200).send(boards);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request get board by id
 * @param req - request board id
 * @param res - response board
 */
const getByID = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req as FastifyReq;
    const board = await boardsRepo.getBoard(id);
    res.status(200).send(board);
  } catch (err) {
    res.status(404).send();
    throw new Error(String(err));
  }
};

/**
 * send request create board
 * @param req - request board data
 * @param res - response new board
 */
const create = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const { body: newData } = req as FastifyReq<Board>;
    const board = await boardsRepo.createBoard(newData);
    res.status(201).send(board);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request update board by id
 * @param req - request board data
 * @param res - response updated board
 */
const updateByID = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const {
      params: { id },
      body: newData,
    } = req as FastifyReq<Board>;

    const board = await boardsRepo.updateBoard(id, newData);
    res.status(200).send(board);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request delete board by id
 * @param req - request board id
 * @param res - response board id

 */
const deleteByID = async (
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const {
      params: { id },
    } = req as FastifyReq;
    const board = await boardsRepo.deleteBoard(id);
    res.status(200).send(board);
  } catch (err) {
    throw new Error(String(err));
  }
};

export default { getAll, getByID, create, deleteByID, updateByID };

import { FastifyReply, FastifyRequest } from 'fastify';
import boardsRepo from './board.memory.repository';
import Board from './board.model';
import { BoardNoID } from './types';

/**
 * send request get all bords
 * @param {FastifyRequest} _req
 * @param {FastifyReply} res
 * @returns {Promise<void>}
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
 * @param {{params: {id: string}}} req
 * @param {FastifyReply} res
 * @returns {Promise<void>}
 */
const getByID = async (
  req: { params: { id: string } },
  res: FastifyReply
): Promise<void> => {
  try {
    const { id } = req.params;
    const board = await boardsRepo.getBoard(id);
    res.status(200).send(board);
  } catch (err) {
    res.status(404).send();
    throw new Error(String(err));
  }
};

/**
 * send request create board
 * @param {{body: Board}} req
 * @param {FastifyReply} res
 * @returns {Promise<void>}
 */
const create = async (
  req: { body: Board },
  res: FastifyReply
): Promise<void> => {
  try {
    const newData = req.body;
    const board = await boardsRepo.createBoard(newData);
    res.status(201).send(board);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request update board by id
 * @param {{params: {id: string}, body: BoardNoID}} req
 * @param {FastifyReply} res
 * @returns {Promise<void>}
 */
const updateByID = async (
  req: { params: { id: string }; body: BoardNoID },
  res: FastifyReply
): Promise<void> => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const board = await boardsRepo.updateBoard(id, newData);
    res.status(200).send(board);
  } catch (err) {
    throw new Error(String(err));
  }
};

/**
 * send request delete board by id
 * @param {{params: {id: string}}} req
 * @param {FastifyReply} res
 * @returns {Promise<void>}
 */
const deleteByID = async (
  req: { params: { id: string } },
  res: FastifyReply
): Promise<void> => {
  try {
    const { id } = req.params;
    const board = await boardsRepo.deleteBoard(id);
    res.status(200).send(board);
  } catch (err) {
    throw new Error(String(err));
  }
};

export default { getAll, getByID, create, deleteByID, updateByID };

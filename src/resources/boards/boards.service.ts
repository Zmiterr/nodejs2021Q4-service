import { FastifyReply, FastifyRequest } from 'fastify';
import boardsRepo from './board.memory.repository';
import Board from './board.model';
import { BoardNoID } from './types';

const getAll = async (_req: FastifyRequest, res: FastifyReply) => {
  try {
    const boards = await boardsRepo.getAllBoards();
    res.status(200).send(boards);
  } catch (err) {
    throw new Error(String(err));
  }
};

const getByID = async (req: { params: { id: string } }, res: FastifyReply) => {
  try {
    const { id } = req.params;
    const board = await boardsRepo.getBoard(id);
    res.status(200).send(board);
  } catch (err) {
    res.status(404).send();
    throw new Error(String(err));
  }
};

const create = async (req: { body: Board }, res: FastifyReply) => {
  try {
    const newData = req.body;
    const board = await boardsRepo.createBoard(newData);
    res.status(201).send(board);
  } catch (err) {
    throw new Error(String(err));
  }
};

const updateByID = async (
  req: { params: { id: string }; body: BoardNoID },
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const board = await boardsRepo.updateBoard(id, newData);
    res.status(200).send(board);
  } catch (err) {
    throw new Error(String(err));
  }
};

const deleteByID = async (
  req: { params: { id: string } },
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    const board = await boardsRepo.deleteBoard(id);
    res.status(200).send(board);
  } catch (err) {
    throw new Error(String(err));
  }
};

export default { getAll, getByID, create, deleteByID, updateByID };

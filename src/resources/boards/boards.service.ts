import boardsRepo from './board.memory.repository';

const getAll = async (req, res) => {
  try {
    const boards = await boardsRepo.getAllBoards();
    res.status(200).send(boards);
  } catch (err) {
    throw new Error(String(err));
  }
};

const getByID = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await boardsRepo.getBoard(id);
    res.status(200).send(board);
  } catch (err) {
    res.status(404).send();
    throw new Error(String(err));
  }
};

const create = async (req, res) => {
  try {
    const newData = req.body;
    const board = await boardsRepo.createBoard(newData);
    res.status(201).send(board);
  } catch (err) {
    throw new Error(String(err));
  }
};

const updateByID = async (req, res) => {
  try {
    const { id } = req.params;
    const newData = req.body;
    const board = await boardsRepo.updateBoard(id, newData);
    res.status(200).send(board);
  } catch (err) {
    throw new Error(String(err));
  }
};

const deleteByID = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await boardsRepo.deleteBoard(id);
    res.status(200).send(board);
  } catch (err) {
    throw new Error(String(err));
  }
};

export default { getAll, getByID, create, deleteByID, updateByID };

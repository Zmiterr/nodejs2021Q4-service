// const router = require('express').Router();
const boardsService = require('./boards.service');
// const usersService = require('./user.service');

// router
//   .route('/')
//   .get(async (req, res) => {
//     const boards = await boardsService.getAll();
//     res.json(boards);
//   })
//   .post(async (req, res) => {
//     const newBoard = await boardsService.create(req.body);
//     res.status(201).json(newBoard);
//   });
//
// router
//   .route('/:id')
//   .get(async (req, res) => {
//     try {
//       const board = await boardsService.getByID(req.params.id);
//       res.json(board);
//     } catch (error) {
//       res.status(404).send(error.message);
//     }
//   })
//
//   .put(async (req, res) => {
//     try {
//       const user = await boardsService.updateByID(req.params.id, req.body);
//       res.json(user);
//     } catch (error) {
//       res.status(404).send(error.message);
//     }
//   })
//
//   .delete(async (req, res) => {
//     try {
//       await boardsService.deleteByID(req.params.id);
//       res.status(204).json();
//     } catch (error) {
//       res.status(404).send(error.message);
//     }
//   });
const BoardRoutes = [
  {
    method: 'GET',
    url: '/boards',
    handler: boardsService.getAll,
  },
  {
    method: 'GET',
    url: '/boards/:id',
    handler: boardsService.getByID,
  },
  {
    method: 'POST',
    url: '/boards',
    handler: boardsService.create,
  },
  {
    method: 'PUT',
    url: '/boards/:id',
    handler: boardsService.updateByID,
  },
  {
    method: 'DELETE',
    url: '/boards/:id',
    handler: boardsService.deleteByID,
  },
];

module.exports = BoardRoutes;

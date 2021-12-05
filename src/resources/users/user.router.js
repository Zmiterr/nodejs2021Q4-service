// const router = require('express').Router();
const usersService = require('./user.service');

// router
//   .route('/')
//   .get(async (req, res) => {
//     const users = await usersService.getAll();
//     res.json(users);
//   })
//   .post(async (req, res) => {
//     const updatedUser = await usersService.createUser(req.body);
//     res.status(201).json(updatedUser);
//   });
//
// router
//   .route('/:id')
//   .get(async (req, res) => {
//     try {
//       const user = await usersService.getUserByID(req.params.id);
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(404).send(error.message);
//     }
//   })
//   .put(async (req, res) => {
//     try {
//       const user = await usersService.updateUserByID(req.params.id, req.body);
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(404).send(error.message);
//     }
//   })
//   .delete(async (req, res) => {
//     try {
//       await usersService.deleteUserByID(req.params.id);
//       res.status(204).json();
//     } catch (error) {
//       res.status(404).send(error.message);
//     }
//   });
const UserRoutes = [
  {
    method: 'GET',
    url: '/users',
    handler: usersService.getAll,
  },
  {
    method: 'GET',
    url: '/users/:id',
    handler: usersService.getUserByID,
  },
  {
    method: 'POST',
    url: '/users',
    handler: usersService.createUser,
  },
  {
    method: 'PUT',
    url: '/users/:id',
    handler: usersService.updateUserByID,
  },
  {
    method: 'DELETE',
    url: '/users/:id',
    handler: usersService.deleteUserByID,
  },
];

module.exports = UserRoutes;

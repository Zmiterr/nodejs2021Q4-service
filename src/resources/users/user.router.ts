import usersService from './user.service';

const userRouter = [
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

export default userRouter;

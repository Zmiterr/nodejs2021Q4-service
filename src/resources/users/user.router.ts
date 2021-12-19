import usersService from './user.service';

// export interface IRoute {
//   method: string;
//   url: string;
//   handler: (req: FastifyRequest, res: FastifyReply) => Promise<unknown>;
// }

const userRouter = [
  {
    method: 'GET' as const,
    url: '/users',
    handler: usersService.getAll,
  },
  {
    method: 'GET' as const,
    url: '/users/:id',
    handler: usersService.getUserByID,
  },
  {
    method: 'POST' as const,
    url: '/users',
    handler: usersService.createUser,
  },
  {
    method: 'PUT' as const,
    url: '/users/:id',
    handler: usersService.updateUserByID,
  },
  {
    method: 'DELETE' as const,
    url: '/users/:id',
    handler: usersService.deleteUserByID,
  },
];

export default userRouter;

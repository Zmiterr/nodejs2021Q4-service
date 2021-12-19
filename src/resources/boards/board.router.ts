import boardsService from './boards.service';

const boardRouter = [
  {
    method: 'GET' as const,
    url: '/boards',
    handler: boardsService.getAll,
  },
  {
    method: 'GET' as const,
    url: '/boards/:id',
    handler: boardsService.getByID,
  },
  {
    method: 'POST' as const,
    url: '/boards',
    handler: boardsService.create,
  },
  {
    method: 'PUT' as const,
    url: '/boards/:id',
    handler: boardsService.updateByID,
  },
  {
    method: 'DELETE' as const,
    url: '/boards/:id',
    handler: boardsService.deleteByID,
  },
];

export default boardRouter;

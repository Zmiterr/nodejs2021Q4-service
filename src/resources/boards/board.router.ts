import boardsService from './boards.service';

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

export default BoardRoutes;

import tasksService from './tasks.service';

const taskRouter = [
  {
    method: 'GET',
    url: '/boards/:boardId/tasks',
    handler: tasksService.getAll,
  },
  {
    method: 'GET',
    url: '/boards/:boardId/tasks/:id',
    handler: tasksService.getByID,
  },
  {
    method: 'POST',
    url: '/boards/:boardId/tasks',
    handler: tasksService.create,
  },
  {
    method: 'PUT',
    url: '/boards/:boardId/tasks/:id',
    handler: tasksService.updateByID,
  },
  {
    method: 'DELETE',
    url: '/boards/:boardId/tasks/:id',
    handler: tasksService.deleteByID,
  },
];

export default taskRouter;

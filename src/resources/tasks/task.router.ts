import tasksService from './tasks.service';

const taskRouter = [
  {
    method: 'GET' as const,
    url: '/boards/:boardId/tasks',
    handler: tasksService.getAll,
  },
  {
    method: 'GET' as const,
    url: '/boards/:boardId/tasks/:id' as const,
    handler: tasksService.getByID,
  },
  {
    method: 'POST' as const,
    url: '/boards/:boardId/tasks',
    handler: tasksService.create,
  },
  {
    method: 'PUT' as const,
    url: '/boards/:boardId/tasks/:id',
    handler: tasksService.updateByID,
  },
  {
    method: 'DELETE' as const,
    url: '/boards/:boardId/tasks/:id',
    handler: tasksService.deleteByID,
  },
];

export default taskRouter;

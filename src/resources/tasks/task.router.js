const router = require('express').Router({ mergeParams: true });
const tasksService = require('./tasks.service');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks);
  })
  .post(async (req, res) => {
    const newTask = await tasksService.create(req.body, req.params.boardId);
    res.status(201).json(newTask);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const task = await tasksService.getByID(req.params.id);
      res.json(task);
    } catch (error) {
      res.status(404).send(error.message);
    }
  })
  .put(async (req, res) => {
    try {
      await tasksService.updateByID(req.params.id, req.body);
      res.json(`Task with id ${req.params.id} updated`);
    } catch (error) {
      res.status(404).send(error.message);
    }
  })
  .delete(async (req, res) => {
    try {
      await tasksService.deleteByID(req.params.id);
      res.status(204).json();
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

module.exports = router;

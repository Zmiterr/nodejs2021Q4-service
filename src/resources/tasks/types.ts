import Task from './task.model';

export type TaskNoID = Omit<Task, 'id'>;

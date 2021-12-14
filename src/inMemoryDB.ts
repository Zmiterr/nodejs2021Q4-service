import Board from './resources/boards/board.model';
import User from './resources/users/user.model';
import Task from './resources/tasks/task.model';

interface DB {
  users: User[];
  boards: Board[];
  tasks: Task[];
}

/**
 * DB in memory
 * @type {{boards: any[], users: any[], tasks: any[]}}
 */
export const inMemoryDB: DB = {
  users: [],
  boards: [],
  tasks: [],
};

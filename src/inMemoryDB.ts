import Board from 'resources/boards/board.model';
import User from './resources/users/user.model';
import Task from './resources/tasks/task.model';

interface DB {
  users: User[];
  boards: Board[];
  tasks: Task[];
}
export const inMemoryDB: DB = {
  users: [],
  boards: [],
  tasks: [],
};

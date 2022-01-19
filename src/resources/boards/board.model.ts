import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Task from '../tasks/task.model';
import { BoardColumn } from '../colunns/columns.model';

/**
 * Board model
 */

@Entity()
export default class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => BoardColumn, (column) => column.board, {
    eager: true,
    cascade: true,
  })
  columns: BoardColumn[];

  @OneToMany(() => Task, (task) => task.boardId, {
    cascade: true,
  })
  tasks: Task[];
}

/**
 * Board constructor
 * @param id - id
 * @param title - title
 * @param columns - columns
 */
// constructor({ id = uuidv4(), title, columns }: Board) {
//   this.id = id;
//   this.title = title;
//   this.columns = columns;
// }

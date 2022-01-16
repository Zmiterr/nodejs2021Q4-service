import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Task from '../tasks/task.model';

/**
 * Board model
 */

@Entity()
export default class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Task, (task) => task.boardId, {
    cascade: true,
  })
  tasks: Task[];

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
}

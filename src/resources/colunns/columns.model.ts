import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import Board from '../boards/board.model';
// eslint-disable-next-line import/no-cycle
import Task from '../tasks/task.model';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, {
    onDelete: 'CASCADE',
  })
  board: Board;

  @ManyToOne(() => Task, (task) => task.columnId, {
    onDelete: 'CASCADE',
  })
  tasks: Task[];
}

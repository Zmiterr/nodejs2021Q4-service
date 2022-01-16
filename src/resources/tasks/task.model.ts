import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '../users/user.model';
// eslint-disable-next-line import/no-cycle
import Board from '../boards/board.model';

/**
 * task model
 */
@Entity()
export default class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  order: number;

  @ManyToOne(() => User, {
    deferrable: 'INITIALLY DEFERRED',
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;

  @Column({ type: 'varchar', nullable: true, default: null })
  userId: string | null;

  @ManyToOne(() => Board, {
    deferrable: 'INITIALLY DEFERRED',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'boardId',
    referencedColumnName: 'id',
  })
  @Column({ type: 'varchar', nullable: true, default: null })
  boardId: string | null;

  /**
   * Task constructor
   * @param  id - id
   * @param  title - title
   * @param  order - order
   * @param  description - description
   * @param userId - userId
   * @param boardId - boardId
   * @param  columnId - columnId
   */
  // constructor({
  //   id = uuidv4(),
  //   title,
  //   order,
  //   description,
  //   userId, // assignee
  //   boardId,
  //   columnId,
  // }: Task) {
  //   this.id = id;
  //   this.title = title;
  //   this.order = order;
  //   this.description = description;
  //   this.userId = userId;
  //   this.boardId = boardId;
  //   this.columnId = columnId;
  // }
}

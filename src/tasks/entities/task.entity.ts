import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import Users from '../../users/entities/user.entity';

@Entity()
export default class Tasks {
  @PrimaryColumn('uuid')
  id?: string;

  @Column()
  title?: string;

  @Column()
  order?: number;

  @Column()
  description?: string;

  @Column({ name: 'boardid', type: 'uuid' })
  boardId;

  @Column({ name: 'userid', nullable: true, type: 'uuid' })
  userId?: string;

  @ManyToOne(() => Users, (user) => user.tasks, {
    nullable: true,
  })
  @Column({ name: 'columnid', nullable: true, type: 'uuid' })
  columnId?: string;
}

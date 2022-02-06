import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import Tasks from '../../tasks/entities/task.entity';

@Entity()
export default class Users {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @OneToMany(() => Tasks, (tasks) => tasks.userId)
  tasks!: Tasks[];

  static toResponse(user: Users) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

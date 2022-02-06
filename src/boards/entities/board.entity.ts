import { Column, Entity, PrimaryColumn } from 'typeorm';

interface boardColumns {
  id: string;
  title: string;
  order: number;
}

@Entity()
export default class Boards {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'json', nullable: true })
  columns: boardColumns[];
}

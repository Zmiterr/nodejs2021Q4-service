import { v4 as uuidv4 } from 'uuid';

export default class Board {
  id: string;

  title: string;

  columns?: string | null;

  constructor({ id = uuidv4(), title, columns }: Board) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

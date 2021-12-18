import { v4 as uuidv4 } from 'uuid';

/**
 * Board model
 */
export default class Board {
  id: string;

  title: string;

  columns?: string | null;

  /**
   * Board constructor
   * @param id - id
   * @param title - title
   * @param columns - columns
   */
  constructor({ id = uuidv4(), title, columns }: Board) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

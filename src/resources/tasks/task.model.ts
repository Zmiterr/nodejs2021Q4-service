import { v4 as uuidv4 } from 'uuid';

/**
 * task model
 */
export default class Task {
  id: string;

  title: string;

  order: string;

  description: string;

  userId?: string | null;

  boardId?: string | null;

  columnId?: string | null;

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
  constructor({
    id = uuidv4(),
    title,
    order,
    description,
    userId, // assignee
    boardId,
    columnId,
  }: Task) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

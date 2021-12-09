import Board from './board.model';

export type BoardNoID = Omit<Board, 'id'>;

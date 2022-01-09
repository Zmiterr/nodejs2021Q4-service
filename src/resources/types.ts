export interface Entity {
  id: string;
  boardId?: string;
}

export interface FastifyReq<T = Entity, P = Entity> {
  body: T;
  params: P;
}

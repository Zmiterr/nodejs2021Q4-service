import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  public id: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly order: number;

  @IsNotEmpty()
  readonly description: string;

  public boardId: string;

  readonly userId?: string;

  readonly columnId?: string;
}

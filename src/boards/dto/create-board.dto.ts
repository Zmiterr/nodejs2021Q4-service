import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  public id: string;

  @IsNotEmpty()
  readonly title: string;
}

import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  public id: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly login: string;

  @IsNotEmpty()
  readonly name: string;
}

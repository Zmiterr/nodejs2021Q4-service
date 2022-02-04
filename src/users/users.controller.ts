import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Users from './entities/user.entity';

@Controller('users')
export class UsersController {
  private readonly entityName = 'user';

  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() createDto: CreateUserDto): Promise<Users> {
    return this.service.create(createDto);
  }

  @Get()
  getAll(): Promise<Users[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Users> {
    const fetchData = await this.service.getOne(id);
    if (!fetchData)
      throw new HttpException(
        `${this.entityName} not found`,
        HttpStatus.NOT_FOUND,
      );
    return fetchData;
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateUserDto,
  ): Promise<Users> {
    const fetchData = await this.service.update(id, updateDto);
    if (!fetchData)
      throw new HttpException(
        `${this.entityName} not found`,
        HttpStatus.NOT_FOUND,
      );
    return fetchData;
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const fetchData = await this.service.remove(id);
    if (!fetchData)
      throw new HttpException(
        `${this.entityName} not found`,
        HttpStatus.NOT_FOUND,
      );
  }
}

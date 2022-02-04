import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import Tasks from './entities/task.entity';

@Controller()
export class TasksController {
  private readonly entityName = 'task';

  constructor(private readonly service: TasksService) {}

  @Post('/boards/:boardId/tasks')
  create(
    @Body() createDto: CreateTaskDto,
    @Param('boardId', ParseUUIDPipe) boardId: string,
  ): Promise<Tasks> {
    createDto.boardId = boardId;
    return this.service.create(createDto);
  }

  @Get('/boards/:boardId/tasks')
  getAll(): Promise<Tasks[]> {
    return this.service.getAll();
  }

  @Get('/boards/:boardId/tasks/:id')
  async getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Tasks> {
    const fetchData = await this.service.getOne(id);
    if (!fetchData)
      throw new HttpException(
        `${this.entityName} not found`,
        HttpStatus.NOT_FOUND,
      );
    return fetchData;
  }

  @Put('/boards/:boardId/tasks/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateTaskDto,
  ) {
    const fetchData = await this.service.update(id, updateDto);
    if (!fetchData)
      throw new HttpException(
        `${this.entityName} not found`,
        HttpStatus.NOT_FOUND,
      );
    return fetchData;
  }

  @Delete('/boards/:boardId/tasks/:id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    const fetchData = await this.service.remove(id);
    if (!fetchData)
      throw new HttpException(
        `${this.entityName} not found`,
        HttpStatus.NOT_FOUND,
      );
  }
}

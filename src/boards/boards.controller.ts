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
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import Boards from './entities/board.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  private readonly entityName = 'board';

  constructor(private readonly service: BoardsService) {}

  @Post()
  create(@Body() createDto: CreateBoardDto): Promise<Boards> {
    return this.service.create(createDto);
  }

  @Get()
  getAll(): Promise<Boards[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Boards> {
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
    @Body() updateDto: UpdateBoardDto,
  ): Promise<Boards> {
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

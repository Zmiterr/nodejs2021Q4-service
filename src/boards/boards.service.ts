import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { getManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Boards from './entities/board.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Boards)
    private rep: Repository<Boards>,
  ) {}

  async create(createDto: CreateBoardDto): Promise<Boards> {
    createDto.id = uuid();
    const newBoard = this.rep.create(createDto);
    return await this.rep.save(newBoard);
  }

  async getAll(): Promise<Boards[]> {
    return await this.rep.find();
  }

  async getOne(id: string): Promise<Boards> {
    return await this.rep.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const fetchData = await this.rep.delete(id);
    if (fetchData.affected) {
      await getManager().query('delete from tasks where boardid=$1', [id]);
      return true;
    }
    return false;
  }

  async update(id: string, updateDto: UpdateBoardDto) {
    const fetchData = await this.rep.findOne(id);

    if (fetchData !== undefined) {
      this.rep.merge(fetchData, updateDto);
      return await this.rep.save(fetchData);
    } else {
      return undefined;
    }
  }
}

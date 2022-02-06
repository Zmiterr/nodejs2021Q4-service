import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Tasks from './entities/task.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private rep: Repository<Tasks>,
  ) {}

  async create(createDto: CreateTaskDto): Promise<Tasks> {
    createDto.id = uuid();
    const newTask = this.rep.create(createDto);
    return await this.rep.save(newTask);
  }

  async getAll(): Promise<Tasks[]> {
    return await this.rep.find();
  }

  async getOne(id: string): Promise<Tasks> | undefined {
    return await this.rep.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const fetchData = await this.rep.delete(id);
    return !!fetchData.affected;
  }

  async update(id: string, updateDto: UpdateTaskDto) {
    const fetchData = await this.rep.findOne(id);

    if (fetchData !== undefined) {
      this.rep.merge(fetchData, updateDto);
      return await this.rep.save(fetchData);
    } else {
      return undefined;
    }
  }
}

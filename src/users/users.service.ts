import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Users from './entities/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private rep: Repository<Users>,
  ) {}

  async create(createDto: CreateUserDto): Promise<Users> {
    createDto.id = uuid();
    const newObj = this.rep.create(createDto);
    const res = await this.rep.save(newObj);
    return <Users>Users.toResponse(res);
  }

  async getAll(): Promise<Users[]> {
    const res = await this.rep.find();
    return <Users[]>res.map((e) => Users.toResponse(e));
  }

  async getOne(id: string): Promise<Users> | undefined {
    const fetchData = await this.rep.findOne(id);
    return fetchData ? <Users>Users.toResponse(fetchData) : undefined;
  }

  async findOne(login: string): Promise<Users> {
    return await this.rep.findOne({ where: { login } });
  }

  async remove(id: string): Promise<boolean> {
    const fetchData = await this.rep.delete(id);
    if (fetchData.affected) {
      await getManager().query('update tasks set userid=null where userid=$1', [
        id,
      ]);
      return true;
    }
    return false;
  }

  async update(id: string, updateDto: UpdateUserDto) {
    const fetchData = await this.rep.findOne(id);

    if (fetchData !== undefined) {
      this.rep.merge(fetchData, updateDto);
      return <Users>Users.toResponse(await this.rep.save(fetchData));
    } else {
      return undefined;
    }
  }
}

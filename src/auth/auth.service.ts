import { Injectable } from '@nestjs/common';
import { authDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(dto: authDto): Promise<unknown> {
    const user = await this.usersService.findOne(dto.login);
    if (!user) return null;
    if (bcrypt.compareSync(dto.password, user.password)) {
      const payload = { userId: user.id, username: user.login };
      const token = this.jwtService.sign(payload);
      return {
        id: user.id,
        token: token,
      };
    }
  }
}

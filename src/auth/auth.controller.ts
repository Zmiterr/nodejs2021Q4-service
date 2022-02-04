import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() dto: authDto) {
    console.log();
    const res = await this.authService.login(dto);
    if (!res) throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    return res;
  }
}

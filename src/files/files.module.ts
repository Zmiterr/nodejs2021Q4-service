import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesControllerExpress } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [MulterModule.register()],
  controllers: [FilesControllerExpress],
  providers: [FilesService],
})
export class FilesModule {}

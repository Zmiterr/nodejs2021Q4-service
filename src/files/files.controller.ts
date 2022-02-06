import {
  Controller,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  UploadedFile,
  Get,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as fs from 'fs';
import { filesDir } from './config';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filesDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

@Controller('file')
@UseInterceptors(ClassSerializerInterceptor)
export class FilesControllerExpress {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!fs.existsSync('upload')) {
      fs.mkdir('upload', (err) => {
        if (err) throw err;
      });
    }

    return ` You can check download using postman by link http://0.0.0.0:3000/file/${file.originalname}`;
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string): StreamableFile {
    return this.filesService.downloadFile(filename);
  }
}

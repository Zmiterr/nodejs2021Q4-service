import { Injectable, StreamableFile, NotFoundException } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs';
import { filesDir } from './config';

@Injectable()
export class FilesService {
  downloadFile(filename: string): StreamableFile {
    const filePath = join(filesDir, filename);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException();
    }

    const file = createReadStream(join(filesDir, filename));
    return new StreamableFile(file);
  }
}

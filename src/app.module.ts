import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { ConfigModule } from '@nestjs/config';
import Users from './users/entities/user.entity';
import Boards from './boards/entities/board.entity';
import Tasks from './tasks/entities/task.entity';
import { name1644003978653 } from '../migrations/mig1644003978653';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    BoardsModule,
    UsersModule,
    TasksModule,
    AuthModule,
    FilesModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: [Users, Boards, Tasks],
          dropSchema: true,
          migrationsRun: true,
          synchronize: false,
          migrations: [name1644003978653],
          // autoLoadEntities: true,
        }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

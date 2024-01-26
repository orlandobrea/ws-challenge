import { Module } from '@nestjs/common';
import { TodoEventsModule } from './task/events.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task.entity'

@Module({
  imports: [
    TodoEventsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      username: process.env.DB_USERNAME || 'docker',
      password: process.env.DB_PASSWORD || 'uno',
      database: 'tasks',
      entities: [Task]
    })
  ],
})
export class AppModule {}

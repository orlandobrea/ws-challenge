import { Module } from '@nestjs/common';
import { TodoEventsGateway } from './events.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './services/task.service';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TodoEventsGateway, TaskService]
})
export class TodoEventsModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { TaskDTO } from '../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) { }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: string): Promise<Task | null> {
    return this.tasksRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async create(dto: TaskDTO): Promise<TaskDTO> {
    await this.tasksRepository.save({
      id: dto.id,
      name: dto.name,
      done: dto.done
    });
    return dto;
  }

  async update(dto: TaskDTO): Promise<Task> {
    const task = await this.findOne(dto.id);
    if (!task) {
      throw new Error('Task not found');
    }
    await this.tasksRepository.update({ id: dto.id }, dto)
    return this.findOne(dto.id)
  }
}

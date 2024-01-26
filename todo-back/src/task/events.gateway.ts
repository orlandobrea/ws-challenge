import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { TaskService } from './services/task.service';
import { TaskDTO } from './dto/task.dto';
import { Task } from './entities/task.entity';

interface Todo {
  name: string;
  id: string;
  done: boolean;
}

interface InputMessage {
  type: string;
  data: TaskDTO;
}



@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TodoEventsGateway {
  @WebSocketServer()
  server: Server;

  wsClients = [];

  todoList: Todo[] = []

  constructor(private readonly taskService: TaskService) { }

  handleConnection(client: any) {
    this.wsClients.push(client);
  }

  private broadcast(event: string, data: any) {
    this.server.emit(event, data);
  }

  @SubscribeMessage('events')
  async findAll(@MessageBody() input: InputMessage | null): Promise<string> {
    if (input.type == 'add') {
      const task = await this.taskService.create(input.data);
      this.broadcast('add', task);
    } else {
      if (input.type == 'remove') {
        await this.taskService.remove(input.data.id);
        this.broadcast('remove', input.data);
        return 'ok'

      } else {
        if (input.type == 'update') {
          const task = await this.taskService.update(input.data);
          this.broadcast('update', task);
          return 'ok';
        } else {
          const list = await this.taskService.findAll();
          this.broadcast('load', list);
          return 'ok'
        }
      }
    }
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    console.log('paso por aqui 2')
    return data;
  }
}

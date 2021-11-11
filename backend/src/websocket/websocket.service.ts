import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketService implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  private users = {};

  handleConnection(client: Socket, ...args: any[]) {
    const { name, group_id } = client.handshake.query;
    this.users[client.id] = { name, group_id };
    console.log(this.users);
  }

  @SubscribeMessage('send-message')
  sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { message: string },
  ): void {
    const {name} = this.users[client.id];
    client.broadcast.emit('receive-message', { ...body, name });
    console.log(body);
  }
}

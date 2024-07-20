import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddMessageDto } from './dto/add-message.dto';
import { AuthService } from 'src/auth/auth.service';
import { Inject } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { Notification } from './entities/notification.entity';

@WebSocketGateway({ namespace: 'notification', cors: { origin: '*' } })
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @Inject(AuthService)
  authService: AuthService;

  @WebSocketServer()
  server: Server;
  connectedUsers: Map<string, string> = new Map();

  async handleConnection(client: Socket): Promise<void> {
    const token = client.handshake.headers.auth;
    if (!token) {
      console.log('No token provided, disconnecting...');
      client.disconnect();
      return;
    }

    let user = null;

    try {
      user = await this.authService.validateAccessToken({ token: token.toString() });
    }
    catch (e) {
      console.log('Error validating token, disconnecting...');
      client.disconnect();
      return;
    }

    if (!user) {
      console.log('Invalid token, disconnecting...');
      client.disconnect();
      return;
    }
    this.connectedUsers.set(client.id, user.guid);
    console.log('User connected ID: ', user);
    console.log('Client connected ID: ', client.id);
    client.emit('notification', 'bienvenido: ' + user.username);
    client.emit('notification', 'conectado al servidor con ID: ' + client.id);
  }

  async handleDisconnect(client: Socket) {
    this.connectedUsers.delete(client.id);
    console.log('Client disconected ID: ', client.id);
  }

  @SubscribeMessage('notification')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: AddMessageDto): any {
    // const userId = this.connectedUsers.get(client?.id);
    // console.log('User ID: ', userId);
    console.log('⬇️ Message from Client: ', client.id);
    console.log(payload);
    // this.server.emit('notification', `Mensaje del servidor ⬆️: ${payload}`);
    //console.log('Client : ', client);
    client.broadcast.emit('notification', ` ⬇️ FROM: ${client.id} - Message: ${payload}`);
    // enviar un mensaje al cliente que emitió el mensaje
    client.emit('notification', 'mensaje para el cliente que emitió el mensaje');
    // enviar un mensaje a un cliente en especifico
    this.server.to(client.id).emit('notification', 'mensaje para un cliente en especifico');
    return 'OK';
  }

  @SubscribeMessage('sendNotificationToUser')
  handleSendNotificationToUser(@MessageBody() payload: {}): any {
    console.log('⬇️ Message from Client desde notificarion: ', payload);
    //    console.log(this.server);
    this.server.emit('notification desde sendNotification', payload);
    return;
  }

  sendNotification(message: string): void {
    // console.log('Client ID de sendnotification: ', this.server);
    // const sendNotification = this.server.emit('notification', message);
    // this.server.sockets.emit('notification', message);
    // console.log('Send Notification: ', sendNotification);
    console.log('Send Notification: ', message);
    this.server.emit('notification', message);
  }

  sendNotificationTo(destinatary: string, notification: Notification): void {
    try {
      console.log('Send Notification to: ', destinatary);
      console.log('Send Notification: ', notification);
      console.log('Connected Users: ', this.connectedUsers);
      const client = Array.from(this.connectedUsers.keys()).find(key => this.connectedUsers.get(key) === destinatary);
      const user = this.connectedUsers.get(client);
      console.log('Send Notification to: ', user);
      this.server.to(client).emit('notification', notification);
    }
    catch (e) {
      console.log('Error sending notification to: ', destinatary);
    }

    // console.log('Client ID de sendnotification: ', this.server);
    // const sendNotification = this.server.emit('notification', message);
    // this.server.sockets.emit('notification', message);
    // console.log('Send Notification: ', sendNotification);
    // console.log('Send Notification: ', notification);
    // this.server.emit('notification', notification);
  }
}

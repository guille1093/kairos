import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AddMessageDto } from './dto/add-message.dto';
import { AuthService } from 'src/auth/auth.service';
import { Notification } from './entities/notification.entity';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    authService: AuthService;
    server: Server;
    connectedUsers: Map<string, string>;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleMessage(client: Socket, payload: AddMessageDto): any;
    handleSendNotificationToUser(payload: {}): any;
    sendNotification(message: string): void;
    sendNotificationTo(destinatary: string, notification: Notification): void;
}

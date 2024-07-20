"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const add_message_dto_1 = require("./dto/add-message.dto");
const auth_service_1 = require("../auth/auth.service");
const common_1 = require("@nestjs/common");
let NotificationGateway = exports.NotificationGateway = class NotificationGateway {
    constructor() {
        this.connectedUsers = new Map();
    }
    async handleConnection(client) {
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
    async handleDisconnect(client) {
        this.connectedUsers.delete(client.id);
        console.log('Client disconected ID: ', client.id);
    }
    handleMessage(client, payload) {
        console.log('⬇️ Message from Client: ', client.id);
        console.log(payload);
        client.broadcast.emit('notification', ` ⬇️ FROM: ${client.id} - Message: ${payload}`);
        client.emit('notification', 'mensaje para el cliente que emitió el mensaje');
        this.server.to(client.id).emit('notification', 'mensaje para un cliente en especifico');
        return 'OK';
    }
    handleSendNotificationToUser(payload) {
        console.log('⬇️ Message from Client desde notificarion: ', payload);
        this.server.emit('notification desde sendNotification', payload);
        return;
    }
    sendNotification(message) {
        console.log('Send Notification: ', message);
        this.server.emit('notification', message);
    }
    sendNotificationTo(destinatary, notification) {
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
    }
};
__decorate([
    (0, common_1.Inject)(auth_service_1.AuthService),
    __metadata("design:type", auth_service_1.AuthService)
], NotificationGateway.prototype, "authService", void 0);
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('notification'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, add_message_dto_1.AddMessageDto]),
    __metadata("design:returntype", Object)
], NotificationGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendNotificationToUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], NotificationGateway.prototype, "handleSendNotificationToUser", null);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ namespace: 'notification', cors: { origin: '*' } })
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map
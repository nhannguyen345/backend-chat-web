import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(ChatGateway.name);

    @WebSocketServer()
    io: Server;

    afterInit(server: any) {
        this.logger.log('Initialized');
    }

    handleConnection(client: any, ...args: any[]) {
        const users = [];
        const { sockets } = this.io.sockets;
        this.logger.log(`Client id: ${client?.id} connected`);
        this.logger.debug(`Number of connected clients: ${sockets.size}`);
        for (let [id, socket] of this.io.of('/').sockets) {
            this.logger.debug(socket);
        }
    }

    handleDisconnect(client: any) {
        this.logger.log(`Client id:${client?.id} disconnected`);
    }

    @SubscribeMessage('ping')
    handleMessage(client: any, payload: any) {
        this.logger.log(`Message received from client id: ${client?.id}`);
        this.logger.debug(`Payload: ${payload}`);
        client.emit('ping', payload);
        return {
            event: 'pong',
            data: 'Wrong data that will make the test fail',
        };
    }

    @SubscribeMessage('message')
    handleSendMessage(client: any, payload: any) {
        this.logger.log(`Send message from: ${client?.id}`);
        this.logger.debug(`Payload: ${payload}`);
        this.io.in(client.id).socketsJoin(payload.roomname);
        this.logger.log(`Client ${client.id} joined room ${payload}`);
        this.io.to(payload.roomname).emit('roomCreated', payload.message);
        return {
            success: true,
        };
    }
}

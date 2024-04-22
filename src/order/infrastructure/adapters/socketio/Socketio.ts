import socketIoClient, { Socket } from "socket.io-client";

export class SocketioRepository {
    private socket: Socket;
    private url: string = process.env.SOCKETIO_URL ?? "http://localhost:3000";

    constructor() {
        this.socket = socketIoClient(this.url, {
            transports: ['websocket'],
            upgrade: false 
        });
    }

    public on(event: string, callback: (data: any) => void): void {
        this.socket.on(event, callback);
    }

    public emit(event: string, data: any): void {
        console.log('url', this.url);
        this.socket.emit(event, data);
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}
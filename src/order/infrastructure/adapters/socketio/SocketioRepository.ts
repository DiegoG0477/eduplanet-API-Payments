import socketIoClient, { Socket } from "socket.io-client";

export class SocketioRepository {
    private socket: Socket | undefined;
    private url: string = process.env.SOCKETIO_URL ?? "http://localhost:3000";

    constructor() {
        this.connect();
    }

    public connect(): void {
        this.socket = socketIoClient(this.url, {
            transports: ['websocket'],
            upgrade: false 
        });
    }

    public on(event: string, callback: (data: any) => void): void {
        if(this.socket === undefined) this.connect();
        this.socket?.on(event, callback);
    }

    public emit(event: string, data: any): void {
        console.log('url', this.url);
        if(this.socket === undefined) this.connect();
        this.socket?.emit(event, data);
    }

    public disconnect(): void {
        if(this.socket === undefined) return;
        this.socket.disconnect();
    }
}
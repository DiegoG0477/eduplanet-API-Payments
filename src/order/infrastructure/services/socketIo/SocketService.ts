import { SocketioRepository } from "../../adapters/socketio/Socketio";
import { ISocketService } from "../../../application/services/ISocketService";

export class SocketService implements ISocketService {
    private socketioRepository: SocketioRepository;

    constructor() {
        this.socketioRepository = new SocketioRepository();
    }

    async responseClient(data: any, userId:string): Promise<void> {
        console.log('sending notificaiton to client', data, userId);
        this.socketioRepository.emit("order:processed", { data, userId });
        this.socketioRepository.disconnect();
        console.log('disconnected from socket');
    }
}
import { SocketioRepository } from "../../adapters/socketio/Socketio";
import { ISocketService } from "../../../application/services/ISocketService";

export class SocketService implements ISocketService {
    private socketioRepository: SocketioRepository;

    constructor() {
        this.socketioRepository = new SocketioRepository();
    }

    async responseClient(data: any): Promise<void> {
        this.socketioRepository.emit("order:processed", data);
    }
}
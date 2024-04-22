import { Client } from "../../domain/entities/Client";
import { ClientRepository } from "../../domain/entities/ClientRepository";

export class AddClientUseCase {
    constructor(private clientRepository: ClientRepository) {}

    async addClient(clientId: string): Promise<Client | null> {
        return this.clientRepository.addClient(clientId);
    }
}
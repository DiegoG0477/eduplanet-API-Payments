import { Client } from "../../domain/entities/Client";
import { ClientRepository } from "../../domain/entities/ClientRepository";

export class GetClientsUseCase {
    constructor(private clientRepository: ClientRepository) {}

    async getClients(): Promise<Client[] | null> {
        return this.clientRepository.getClients();
    }
}
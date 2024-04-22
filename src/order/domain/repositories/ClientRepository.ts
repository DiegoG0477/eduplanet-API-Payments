import { Client } from "../entities/Client";

export interface ClientRepository {
    addClient(clientId: string): Promise<Client | null>;
    getClients(): Promise<Client[] | null>;
}
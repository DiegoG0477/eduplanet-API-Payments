import { Client } from "../../../../domain/entities/Client";
import { ClientRepository } from "../../../../domain/entities/ClientRepository";
import { ClientMongodbModel } from "../schema/MongodbClientSchema";

export class MongodbClientRepository implements ClientRepository {
    async addClient(clientId: string): Promise<Client | null> {
        const client = new Client(clientId);
        await ClientMongodbModel.create({ client_id: client.clientId });
        return client;
    }

    async getClients(): Promise<Client[] | null> {
        const clients = await ClientMongodbModel.find();
        return clients;
    }
}
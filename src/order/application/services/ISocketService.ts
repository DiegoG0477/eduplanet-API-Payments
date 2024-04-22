export interface ISocketService {
    responseClient(data: any, userId: string): Promise<void>;
}
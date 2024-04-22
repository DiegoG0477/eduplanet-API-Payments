export interface ISocketService {
    responseClient(data: any): Promise<void>;
}
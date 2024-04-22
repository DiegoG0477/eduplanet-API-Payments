export class Order {
    constructor(
        readonly id: string,
        readonly userId: string,
        readonly productId: string,
        readonly status: string,
        readonly createdAt: Date,
        readonly updatedAt: Date,
    ){}
}
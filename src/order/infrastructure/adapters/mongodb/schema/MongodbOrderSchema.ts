import { Order } from "../../../../domain/repositories/Order";
import mongoose, { Schema, Document } from 'mongoose';

type IOrder = Order & Document;

const OrderSchema: Schema = new Schema({
    idUser: { type: String, required: true },
    idProduct: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

OrderSchema.virtual('id').get(function (this: IOrder) {
    return this._id.toHexString();
});

OrderSchema.set('toJSON', {
    virtuals: true,
});

const OrderMongodbModel =  mongoose.model<IOrder>('Order', OrderSchema);
export { OrderMongodbModel };
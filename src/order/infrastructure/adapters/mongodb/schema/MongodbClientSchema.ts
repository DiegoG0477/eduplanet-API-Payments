import { Client } from '../../../../domain/entities/Client';
import mongoose, { Schema, Document } from 'mongoose';

type IClient = Client & Document;

const ClientSchema: Schema = new Schema({
    client_id: { type: String, required: true },
});

ClientSchema.virtual('id').get(function (this: IClient) {
    return this._id.toHexString();
});

ClientSchema.set('toJSON', {
    virtuals: true,
});


const ClientMongodbModel =  mongoose.model<IClient>('User', ClientSchema);

export { ClientMongodbModel };
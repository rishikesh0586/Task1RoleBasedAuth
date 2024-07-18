import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [],
    required: true,
  },
});

export interface IRole extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  permissions: string[];
}

export const Role = mongoose.model<IRole>('Role', roleSchema);

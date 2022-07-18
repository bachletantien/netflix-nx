import { model, Schema } from 'mongoose';

const ListSchema = new Schema<List>(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    content: { type: Array },
    genre: { type: String },
  },
  { timestamps: true }
);

export default model('List', ListSchema);

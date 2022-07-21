import Joi from 'joi';
import { model, Schema } from 'mongoose';

const ListSchema = new Schema<List>(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    content: { type: [String] },
    genre: { type: [String] },
  },
  { timestamps: true }
);

export const listValidator = async (list: List): Promise<List> => {
  const schema = Joi.object<List>({
    title: Joi.string().required(),
    type: Joi.string(),
    content: Joi.array().items(Joi.string()),
    genre: Joi.array().items(Joi.string()),
  });

  return await schema.validateAsync(list, { abortEarly: true });
};

const ListModel = model('List', ListSchema);

export default ListModel;

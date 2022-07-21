import Joi from 'joi';
import { model, Schema } from 'mongoose';

const movieSchema = new Schema<Movie>(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String },
    genre: { type: [String] },
    imgSm: { type: String },
    imgTitle: { type: String },
    isSeries: { type: Boolean, default: false },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
  },
  { timestamps: true }
);

export const movieValidator = async (movie: Movie): Promise<Movie> => {
  const schema = Joi.object<Movie>({
    title: Joi.string().required(),
    desc: Joi.string(),
    genre: Joi.array().items(Joi.string()),
    img: Joi.string(),
    imgSm: Joi.string(),
    imgTitle: Joi.string(),
    trailer: Joi.string(),
    video: Joi.string(),
    year: Joi.string(),
    isSeries: Joi.boolean(),
    limit: Joi.number(),
  });

  return await schema.validateAsync(movie, { abortEarly: true });
};

const MovieModel = model('Movie', movieSchema);

export default MovieModel;

import Joi from 'joi';
import { model, Schema } from 'mongoose';

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    profiledPic: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const userValidator = async (user: User): Promise<User> => {
  const schema = Joi.object<User>({
    username: Joi.string()
      .alphanum()
      .message('Only accept a-zA-Z0-9 charaters')
      .min(3)
      .message(`${user.username} length must be at least 3 characters long`)
      .max(30)
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),
    profiledPic: Joi.string(),
    isAdmin: Joi.boolean(),
  });

  return await schema.validateAsync(user, { abortEarly: true });
};

const UserModel = model('User', userSchema);
export default UserModel;

import { userWithoutPassword } from './../utils/response.util';
import { generateAccessToken } from 'utils/auth.util';
import { Request, Response } from 'express';
import UserModel, { userValidator } from 'models/user.model';
import bcrypt from 'bcrypt';
import { encryptPassword } from 'utils/encrypt.util';

const authController = {
  // register user
  addUser: async (req: Request, res: Response) => {
    try {
      const validatedUser = await userValidator(req.body);

      // const hashed = encryptPassword(req.body.password);
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      //Create new user
      const user = new UserModel({ ...validatedUser, password: hashed });
      const addedUser = await user.save();
      res.status(201).json(addedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  // login user
  loginUser: async (req: Request, res: Response) => {
    try {
      const user = await UserModel.findOne({
        email: req.body.email,
      });
      !user && res.status(404).json({ message: 'wrong email!' });
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(403).json('Wrong password!');
      }
      const accessToken = generateAccessToken(user);

      const userData = userWithoutPassword(user.toObject());
      res.status(200).json({ ...userData, accessToken });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

export default authController;

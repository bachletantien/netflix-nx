import { JwtPayload } from 'jsonwebtoken';
import { userWithoutPassword } from 'utils/response.util';
import { Request, Response } from 'express';
import UserModel from 'models/user.model';
import { encryptPassword } from 'utils/encrypt.util';

const userController = {
  // update user
  updateUser: async (req: Request, res: Response) => {
    try {
      const userToUpdate = await UserModel.findById(req.params.id);
      await userToUpdate.updateOne({
        $set: {
          ...req.body,
          ...(req.body.password && {
            password: await encryptPassword(req.body.password),
          }),
        },
      });
      res.status(200).json(userWithoutPassword(userToUpdate.toObject()));
    } catch (error) {
      res.status(400).json(error);
    }
  },

  //delete user
  deleteUser: async (req: Request, res: Response) => {
    try {
      const user = req['user'] as JwtPayload;
      if (user.id === req.params.id || user.isAdmin) {
        await UserModel.findByIdAndDelete(req.params.id);
        return res.status(200).json('User has been deleted!');
      }
      return res.status(401).json("You can't delete!");
    } catch (error) {
      res.status(400).json(error);
    }
  },
  //get all user
  getAllUser: async (req: Request, res: Response) => {
    try {
      const user = req['user'] as JwtPayload;
      if (user.id === req.params.id || user.isAdmin) {
        const users = await UserModel.find();
        return res
          .status(200)
          .json(users.map((user) => userWithoutPassword(user.toObject())));
      }
      res.status(401).json("You don't have a permission!");
    } catch (error) {
      res.status(400).json(error);
    }
  },
  //get user by id
  getUserById: async (req: Request, res: Response) => {
    try {
      const user = req['user'] as JwtPayload;
      if (user.id === req.params.id || user.isAdmin) {
        const user = await UserModel.findById(req.params.id);
        return res.status(200).json(userWithoutPassword(user.toObject()));
      }
      res.status(401).json("You don't have a permission!");
    } catch (error) {
      res.status(400).json(error);
    }
  },
};

export default userController;

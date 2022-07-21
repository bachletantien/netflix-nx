import { HttpStatusCode } from 'constants/http.constant';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import ListModel, { listValidator } from 'models/list.model';

const listController = {
  createList: async (req: Request, res: Response) => {
    try {
      const user = req['user'] as JwtPayload;
      if (user.isAdmin) {
        const validatedList = await listValidator(req.body);
        const list = new ListModel(validatedList);
        const addedList = await list.save();
        return res.status(HttpStatusCode.OK).json(addedList);
      }
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json("You don't have a permission!");
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.message,
      });
    }
  },

  // get all lists
  getAllLists: async (req: Request, res: Response) => {
    try {
      const type = req.query.type;
      const genre = req.query.genre;
      const limit = Number(req.query.limit) || 10;

      const lists = await ListModel.aggregate([
        {
          $match: {
            ...(type && { type }),
            ...(genre && { genre: { $in: [genre] } }),
          },
        },
        { $sample: { size: limit } },
      ]);
      res.status(HttpStatusCode.OK).json(lists);
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.message,
      });
    }
  },
};

export default listController;

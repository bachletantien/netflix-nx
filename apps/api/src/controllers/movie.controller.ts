import { HttpStatusCode } from 'constants/http.constant';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import MovieModel, { movieValidator } from 'models/movie.model';

const movieController = {
  createMovie: async (req: Request, res: Response) => {
    try {
      const user = req['user'] as JwtPayload;
      if (user.isAdmin) {
        const validatedMovie = await movieValidator(req.body);
        const movie = new MovieModel(validatedMovie);
        const addedMovie = await movie.save();
        return res.status(HttpStatusCode.OK).json(addedMovie);
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
  //update movie
  updateMovie: async (req: Request, res: Response) => {
    try {
      const user = req['user'] as JwtPayload;
      if (user.id === req.params.id || user.isAdmin) {
        const movieToUpdate = await MovieModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        return res.status(HttpStatusCode.OK).json(movieToUpdate);
      }
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json('not are not permission!');
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: error.message,
      });
    }
  },
  //delete movie
  deleteMovie: async (req: Request, res: Response) => {
    try {
      const user = req['user'] as JwtPayload;
      if (user.id === req.params.id || user.isAdmin) {
        await MovieModel.findByIdAndDelete(req.params.id);
        return res.status(HttpStatusCode.OK).json('User has been deleted!');
      }
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json('You have not permission!');
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json(error);
    }
  },
  //get a movie by id
  getMovie: async (req: Request, res: Response) => {
    try {
      const movie = await MovieModel.findById(req.params.id);
      return res.status(HttpStatusCode.OK).json(movie);
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json(error);
    }
  },

  //get random movie
  getRandomMovie: async (req: Request, res: Response) => {
    const type = req.query.type;
    const limit = Number(req.query.limit) | 1;
    let movie;
    try {
      if (type === 'series') {
        movie = await MovieModel.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: limit } },
        ]);
      } else {
        movie = await MovieModel.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: limit } },
        ]);
      }
      res.status(HttpStatusCode.OK).json(movie);
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json(error);
    }
  },

  // Get all movies
  getAllMovies: async (req: Request, res: Response) => {
    try {
      const user = req['user'] as JwtPayload;
      if (user.isAdmin) {
        const movies = await MovieModel.find();
        return res.status(HttpStatusCode.OK).json(movies);
      }
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json('You have not permission!');
    } catch (error) {
      res.status(HttpStatusCode.BAD_REQUEST).json(error);
    }
  },
};

export default movieController;

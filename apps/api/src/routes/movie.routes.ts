import movieController from 'controllers/movie.controller';
import { Router } from 'express';

const router = Router();

//create movie
router.post('/create', movieController.createMovie);

// update movie
router.put('/:id', movieController.updateMovie);

// delete movie
router.delete('/:id', movieController.deleteMovie);

//get a movie by type
router.get('/find/:id', movieController.getMovie);

//get a random movie
router.get('/random', movieController.getRandomMovie);

//get all movies
router.get('/', movieController.getAllMovies);

export default router;

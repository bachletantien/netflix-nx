import listController from 'controllers/list.controller';
import { Router } from 'express';

const router = Router();

//create movie
router.post('/create', listController.createList);

//get all lists
router.get('/', listController.getAllLists);

export default router;

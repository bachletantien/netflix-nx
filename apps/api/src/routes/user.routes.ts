import { Router } from 'express';
import userController from 'controllers/user.controller';
const router = Router();

//update
router.put('/:id', userController.updateUser);

//delete
router.delete('/:id', userController.deleteUser);

//get all
router.get('/', userController.getAllUser);

//get user by id
router.get('/:id', userController.getUserById);

export default router;

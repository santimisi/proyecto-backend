import express from 'express';
import {
	ping,
	signIn,
	listUsers,
	login,
	isLogged,
	logout,
	convert,
	deleteUser,
} from '../Controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/ping', ping);
usersRouter.get('/allUsers', listUsers);
usersRouter.post('/signin', signIn);
usersRouter.post('/login', login);
usersRouter.get('/islogged', isLogged);
usersRouter.get('/logout', logout);
usersRouter.post('/convert', convert);
usersRouter.delete('/delete/:id', deleteUser);

export default usersRouter;

import express from 'express';

import { ContenedorProductos } from '../Class/ContenedorProductos.js';

// inicializo router de express para ruteo
const mainRouter = express.Router();

// inicializo contenedor de Productos
const contenedorProductos = new ContenedorProductos();

// jala toda la informacion de todos los items
mainRouter.get('/ping', (req, res) => {
	res
		.status(200)
		.json({ status: 'success', message: 'pong', isAuth: req.session.isAuth });
});

mainRouter.get('/productos-test', (req, res) => {
	try {
		const randomItems = contenedorProductos.getAllItems();
		res.status(200).json(randomItems);
	} catch (e) {
		res.status(500).json({
			status: 'error',
			message: 'Algo salio mal al traer 5 items random',
		});
	}
});

mainRouter.get('/isAuth', (req, res) => {
	if (req.session.userName) {
		res.status(200).json({
			userName: req.session.userName,
		});
	} else {
		res.status(500).json({
			status: 'error',
			message: 'Algo salio mal al traer info de user',
		});
	}
});

mainRouter.post('/login', (req, res) => {
	const { userName, password } = req.body;
	try {
		req.session.userName = userName;
		req.session.password = password;
		res.status(200).json({
			status: 'success',
			message: 'Inicio de sesion correctamente',
			id: req.session.id,
		});
	} catch (e) {
		res
			.status(500)
			.json({ status: 'error', message: 'Algo salio mal al hacer login' });
	}
});

mainRouter.get('/logout', (req, res) => {
	try {
		req.session.destroy();
		res.clearCookie('session-id');
		res.status(200).json({
			status: 'success',
			message: 'Session cerrada',
		});
	} catch (e) {
		res
			.status(500)
			.json({ status: 'error', message: 'Algo salio mal al hacer logout' });
	}
});

export default mainRouter;

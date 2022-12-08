import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import productosRouter from './Routers/productosRouter.js';
import carritoRouter from './Routers/carritoRouter.js';
import usersRouter from './Routers/usersRouter.js';
import logsRouter from './Routers/logsRouter.js';
import {
	corsConfig,
	headerConfig,
	socketCorsConfig,
} from './Utils/corsConfig.js';
import { sessionOptions } from './Utils/mongoStoreSession.js';
import { socketLogic } from './Utils/socketLogic.js';

// PORT CONFIG ------
dotenv.config();
const PORT = process.env.PORT || 8080;
const SOCKET_PORT = process.env.SOCKET_PORT || 3001;
const app = express();

// APP STANDARD CONFIG ------
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MONGO SESSION CONFIG ------
app.use(headerConfig);
app.use(session(sessionOptions));

// ROUTING CONFIGS ------
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);
app.use('/api/users', usersRouter);
app.use('/api/logs', logsRouter);

// SOCKET IO CONFIG ------
const socketServer = http.createServer(app);
const io = new Server(socketServer, socketCorsConfig);
io.on('connection', socketLogic);

//  STARTING MONGO SERVER ------
try {
	mongoose
		.connect(process.env.CONNECTION_MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Connected to mongo'))
		.catch((error) => console.log(error.message));
} catch (e) {
	console.error('Algo salio mal con mongo', e);
}

const server = app.listen(PORT, () => {
	socketServer.listen(SOCKET_PORT, () => {
		console.log(`Socket.io server active on port: ${SOCKET_PORT}`);
	});
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));

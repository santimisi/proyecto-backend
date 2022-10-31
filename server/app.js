import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import productosRouter from './Routers/productosRouter.js';
import carritoRouter from './Routers/carritoRouter.js';
import mongoose from 'mongoose';

dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);

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
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));

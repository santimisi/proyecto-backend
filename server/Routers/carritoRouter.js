import express from 'express';
import {
	ping,
	createNewCart,
	deleteCart,
	getCarts,
	getProductInCart,
	addProductInExistingCart,
	deleteItemInCart,
} from '../Controllers/carritoController.js';

const carritoRouter = express.Router();

carritoRouter.get('/ping', ping);
// el front solo ocupa esta ruta por que no tiene sentido que el cliente
// pueda modificar carritos o borrarlos, al igual que mover los items dentro del carrito
carritoRouter.post('/', createNewCart);
// esto se prueba con Insomnia o Postman para ver su funcionamiento, despues implementare
// un front para admin que permita usar todas estas rutas para modificar el carrito
carritoRouter.get('/', getCarts);
carritoRouter.delete('/:id', deleteCart);
carritoRouter.get('/:id/productos', getProductInCart);
carritoRouter.post('/:id/productos', addProductInExistingCart);
carritoRouter.delete('/:id/productos/:id_prod', deleteItemInCart);

export default carritoRouter;

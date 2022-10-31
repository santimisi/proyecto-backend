import express from 'express';
import {
	ping,
	createNewCart,
	deleteCart,
	getCarts,
	getOneCart,
	getOneCartItems,
	addProductInExistingCart,
	deleteItemInCart,
} from '../Controllers/carritoController.js';

const carritoRouter = express.Router();

carritoRouter.get('/ping', ping);
// el front solo ocupa esta ruta por que no tiene sentido que el cliente
// pueda modificar carritos o borrarlos, al igual que mover los items dentro del carrito
carritoRouter.get('/:id/productos', getOneCartItems);
// estas siguientes rutas se prueban con Insomnia o Postman para ver su funcionamiento, despues implementare
// un front para admin que permita usar todas estas rutas para modificar el carrito
carritoRouter.get('/', getCarts);
carritoRouter.get('/:id', getOneCart);
carritoRouter.post('/', createNewCart);
carritoRouter.delete('/:id', deleteCart);
carritoRouter.post('/:id/productos', addProductInExistingCart);
carritoRouter.delete('/:id/productos/:id_prod', deleteItemInCart);

export default carritoRouter;

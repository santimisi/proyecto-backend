import CarritosModel from '../Models/Carritos.js';

export class ContenedorCarritos {
	// mostrar todos los productos
	async getAllCarts() {
		try {
			const allCarts = await CarritosModel.find();
			return allCarts;
		} catch (e) {
			throw new Error('Algo salio mal al mostrar todos');
		}
	}

	// regresar un carrito dependiendo del ID recivido
	async getCartById(_id) {
		try {
			const cart = await CarritosModel.findById(_id);
			return cart;
		} catch (e) {
			throw new Error('Algo salio mal al mostrar un solo carrito');
		}
	}

	// guarda un carrito nuevo a la collection
	async saveOneCart(incomingItem) {
		try {
			const newItem = new CarritosModel({ productos: incomingItem });
			await newItem.save();
			return newItem._id.toString();
		} catch (e) {
			throw new Error('Algo salio mal al guardar');
		}
	}

	// elimina un carrito completo
	async deleteOneCart(_id) {
		try {
			await CarritosModel.findByIdAndDelete(_id);
		} catch (e) {
			throw new Error('Algo salio mal al borrar un carrito');
		}
	}

	// modifica la cantidad del item existente +1 para no tener items repetidos en array
	async addOneMoreExistingItemInCart(requestedCartId, incomingItem) {
		try {
			await CarritosModel.updateOne(
				{ _id: requestedCartId, 'productos._id': incomingItem._id },
				{ $inc: { 'productos.$.quantity': 1 } }
			);
		} catch (e) {
			throw new Error('Algo salio mal al editar item existente de carrito');
		}
	}

	// hace push al item nuevo existente
	async addNonExistentItemToCart(requestedCartId, incomingItem) {
		try {
			await CarritosModel.updateOne(
				{ _id: requestedCartId },
				{ $push: { productos: incomingItem } }
			);
		} catch (e) {
			throw new Error('Algo salio mal al agregar item no existente a carrito');
		}
	}

	// elimina un item del carrito
	async deleteOneItemInCart(requestedCartId, itemId) {
		try {
			await CarritosModel.updateOne(
				{ _id: requestedCartId },
				{
					$pull: {
						productos: { _id: itemId },
					},
				}
			);
		} catch (e) {
			throw new Error('Algo salio mal al agregar item al carrito');
		}
	}
}

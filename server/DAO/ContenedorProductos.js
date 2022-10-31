import ProductosModel from '../Models/Productos.js';

export class ContenedorProductos {
	// mostrar todos los productos
	async getAllProducts() {
		try {
			const allProducts = await ProductosModel.find();
			return allProducts;
		} catch (e) {
			throw new Error('Algo salio mal al mostrar todos');
		}
	}

	// obtener un producto por ID
	async getByIdProduct(id) {
		try {
			const item = await ProductosModel.findById(id);
			return item;
		} catch (e) {
			throw new Error('Algo salio mal al buscar Id');
		}
	}

	// guardar un nuevo producto
	async saveOneProduct(incomingItem) {
		try {
			const newItem = new ProductosModel({ ...incomingItem });
			await newItem.save();
		} catch (e) {
			throw new Error('Algo salio mal al guardar');
		}
	}

	// editar un producto existente
	async editOneProduct(newItemData, _id) {
		try {
			await ProductosModel.updateOne({ _id }, newItemData);
		} catch (e) {
			throw new Error('Algo salio mal al editar');
		}
	}

	// borrar un producto existente
	async deleteOneProduct(_id) {
		try {
			await ProductosModel.findByIdAndDelete(_id);
		} catch (e) {
			throw new Error('Algo salio mal al borrar');
		}
	}
}

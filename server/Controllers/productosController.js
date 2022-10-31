import { ContenedorProductos } from '../DAO/ContenedorProductos.js';

// este contenedor contiene todas las funciones de mongoos que se van a ocupar en carrito y en productos
const contenedorProductos = new ContenedorProductos();

// esto es solo un test
export const ping = async (req, res) => {
	res.status(200).json({ message: 'pong' });
};

// se hace llamado a este metodo en <ProductGrid/>
export const getAll = async (req, res) => {
	try {
		const allProducts = await contenedorProductos.getAllProducts();
		res.status(200).json(allProducts);
	} catch (e) {
		res
			.status(501)
			.json({ status: 'ERROR', message: 'No se pueden encontrar items' });
	}
};

// se hace llamado a este metodo en <ProductDetail />
export const getOne = async (req, res) => {
	const { id } = req.params;
	try {
		const foundItem = await contenedorProductos.getByIdProduct(id);
		res.status(200).json(foundItem);
	} catch (e) {
		res.status(500).json({ status: 'Error', message: 'success' });
	}
};

// se hace llamado a este metodo en <Form/>
export const addOne = async (req, res) => {
	try {
		await contenedorProductos.saveOneProduct(req.body);
		return res
			.status(201)
			.json({ status: 'OK', message: 'Item Agregado Satisfactoriamente' });
	} catch (e) {
		return res
			.status(501)
			.json({ status: 'ERROR', message: 'No se pudo agregar item', e });
	}
};

// se hace la llamada en  <AdminButtons />
export const modifyOne = async (req, res) => {
	const newItemData = req.body;
	const { id } = req.params;
	try {
		await contenedorProductos.editOneProduct(newItemData, id);
		res
			.status(200)
			.json({ status: 'OK', message: 'Item Editado Satisfactoriamente' });
	} catch (e) {
		return res
			.status(500)
			.json({ status: 'ERROR', message: 'No se pudo editar item', e });
	}
};

// se hace llamado a este metodo solo en <AdminButtons />
export const deleteOne = async (req, res) => {
	const { id } = req.params;
	try {
		await contenedorProductos.deleteOneProduct(id);
		res
			.status(200)
			.json({ status: 'OK', message: 'Item Borrado Satisfactoriamente' });
	} catch (e) {
		return res
			.status(500)
			.json({ status: 'ERROR', message: 'No se pudo borrar item', e });
	}
};

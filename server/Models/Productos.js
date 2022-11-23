import mongoose, { Schema } from 'mongoose';

const ProductosSchema = new Schema({
	timestamp: {
		type: Date,
		default: new Date(),
	},
	nombre: String,
	descripcion: String,
	codigo: String,
	foto: String,
	price: Number,
	stock: Number,
	type: String,
	alcohol: Number,
	region: String,
	sold: Number,
});

const ProductosModel = mongoose.model('Productos', ProductosSchema);

export default ProductosModel;

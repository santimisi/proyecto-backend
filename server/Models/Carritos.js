import mongoose, { Schema } from 'mongoose';

const CarritosSchema = new Schema({
	productos: {
		type: Array,
	},
	timestamp: {
		type: Date,
		default: new Date(),
	},
});

const CarritosModel = mongoose.model('carritos', CarritosSchema);

export default CarritosModel;

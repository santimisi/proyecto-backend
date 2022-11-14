import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
	author: {
		email: { type: String },
		nombre: { type: String },
		apellido: { type: String },
		edad: { type: Number },
		alias: { type: String },
		avatar: { type: String },
	},
	text: { type: String },
	timeStamp: { type: Date, default: Date.now },
});

const MensajesModel = mongoose.model('Mensajes', messageSchema);

export default MensajesModel;

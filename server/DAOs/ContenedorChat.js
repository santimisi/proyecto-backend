import MensajesModel from '../Models/Mensajes.js';

export class ContenedorChat {
	// mostrar todos los productos
	async getAllMessages() {
		try {
			const allMessages = await MensajesModel.find();
			return allMessages;
		} catch (e) {
			throw new Error('Algo salio mal al mostrar todos');
		}
	}

	// guardar un nuevo producto
	async saveOneMessage(incomingMessage) {
		try {
			const newConversation = new MensajesModel({ ...incomingMessage });
			await newConversation.save();
		} catch (e) {
			throw new Error('Algo salio mal al guardar');
		}
	}
}

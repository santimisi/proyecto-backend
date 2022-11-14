import { ContenedorChat } from '../DAOs/ContenedorChat.js';

// inicializo contenedores de DAO de ambas chat nada mas
const contenedorChat = new ContenedorChat();

export const socketLogic = async (socket) => {
	console.log(`Usuario conectado con ID: ${socket.id}`);
	// aqui se recuperan todos los mensajes que se han mandado
	try {
		const allCurrentMessages = await contenedorChat.getAllMessages();
		socket.emit('recover_conversation', allCurrentMessages);
	} catch (e) {
		console.error(e);
	}

	socket.on('send_message', async (data) => {
		console.log(data);
		await contenedorChat.saveOneMessage(data);
		const updatedConversation = await contenedorChat.getAllMessages();
		socket.emit(
			'receive_message',
			updatedConversation[updatedConversation.length - 1]
		);
		socket.broadcast.emit(
			'receive_message',
			updatedConversation[updatedConversation.length - 1]
		);
	});
	// elimina un item, vuelve a traer la base de datos resultante y la manda por recover_items
	socket.on('disconnect', () => {
		console.log('Usuario desconectado:', socket.id);
	});
};

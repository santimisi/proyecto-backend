import { ContenedorLogs } from '../DAO/ContenedorLogs.js';

const contenedorLogs = new ContenedorLogs();

export const socketLogic = async (socket) => {
	console.log(`Visitante conectado con ID: ${socket.id}`);
	// recupera todos los logs
	try {
		// await conseguir mensahes y mandarlos abajo
		const allLogs = await contenedorLogs.getAllLogs();
		socket.emit('recover_logs', allLogs);
	} catch (e) {
		console.error(e);
	}

	socket.on('disconnect', () => {
		console.log('Usuario desconectado:', socket.id);
	});
};

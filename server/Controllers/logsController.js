import { ContenedorLogs } from '../DAO/ContenedorLogs.js';

const contenedorLogs = new ContenedorLogs();

// esto es solo un test
export const ping = async (req, res) => {
	res.status(200).json({ message: 'pong' });
};

export const listAllLogs = async (req, res) => {
	try {
		const allLogs = await contenedorLogs.getAllLogs();
		res.status(200).json(allLogs);
	} catch (e) {
		res
			.status(501)
			.json({ status: 'ERROR', message: 'No se pueden encontrar items' });
	}
};

// hay un metodo extra para incluir logs nuevos, pero se dejo dentro de otros controladores para poder meter toda la informacion requerida

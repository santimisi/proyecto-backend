import LogsModel from '../Models/Logs.js';

export class ContenedorLogs {
	// obtener todos los logs
	async getAllLogs() {
		try {
			const allLogs = await LogsModel.find();
			return allLogs;
		} catch (e) {
			throw new Error('Algo salio mal al mostrar todos los logs');
		}
	}

	async saveOneLog(incomingItem) {
		try {
			const newLog = new LogsModel({ ...incomingItem });
			await newLog.save();
		} catch (e) {
			throw new Error('Algo salio mal al guardar nuevo Log');
		}
	}
}

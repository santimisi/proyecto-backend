import mongoose, { Schema } from 'mongoose';

const LogsSchema = new Schema({
	timestamp: {
		type: Date,
		default: new Date(),
	},
	title: String,
	descripcion: String,
	link: String,
});

const LogsModel = mongoose.model('Logs', LogsSchema);

export default LogsModel;

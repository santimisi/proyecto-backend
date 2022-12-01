import mongoose, { Schema } from 'mongoose';

const UsersSchema = new Schema({
	isAdmin: { type: Boolean, default: false },
	userName: { type: String, unique: true },
	password: String,
	name: { type: String },
	lastName: { type: String },
	profilePicture: { type: String }, // <--- Esto despoues va a cambiar para hacerse un archivo
	timestamp: {
		type: Date,
		default: new Date(),
	},
});

const UsersModel = mongoose.model('Users', UsersSchema);

export default UsersModel;

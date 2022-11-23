import mongoose, { Schema } from 'mongoose';

const UsersSchema = new Schema({
	isAdmin: { type: Boolean, default: false },
	userName: { type: String, unique: true },
	password: String,
	timestamp: {
		type: Date,
		default: new Date(),
	},
});

const UsersModel = mongoose.model('Users', UsersSchema);

export default UsersModel;

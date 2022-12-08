import UsersModel from '../Models/Users.js';

export class ContenedorUsers {
	// mostrar todos los productos
	async getAllUsers() {
		try {
			const allProducts = await UsersModel.find();
			return allProducts;
		} catch (e) {
			throw new Error('Algo salio mal al mostrar todos los usuarios');
		}
	}

	async registerNewUser(incomingUser) {
		try {
			const newUser = new UsersModel({ ...incomingUser });
			await newUser.save();
		} catch (e) {
			throw new Error(e);
		}
	}

	async findOneUser(incomingUserName) {
		try {
			const user = await UsersModel.findOne({
				userName: `${incomingUserName}`,
			});
			return user;
		} catch (e) {
			throw new Error('Algo salio mal al buscar un usuario usuario');
		}
	}

	async editOneUser(newUserData, _id) {
		try {
			await UsersModel.updateOne({ _id }, newUserData);
		} catch (e) {
			throw new Error('algo sali mal modificar typo de cuenta');
		}
	}

	async deleteOneUser(_id) {
		try {
			await UsersModel.findByIdAndDelete(_id);
		} catch (e) {
			throw new Error('Algo salio mal al borrar usuario');
		}
	}
}

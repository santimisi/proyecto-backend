import bcrypt, { genSaltSync } from 'bcrypt';
import { ContenedorLogs } from '../DAO/ContenedorLogs.js';
import { ContenedorUsers } from '../DAO/ContenedorUsers.js';
// este contenedor contiene todas las funciones de mongoos que se van a ocupar en carrito y en productos
const contenedorUsers = new ContenedorUsers();
const contenedorLogs = new ContenedorLogs();

// esto es solo un test
export const ping = async (req, res) => {
	res.status(200).json({ message: 'pong' });
};

export const listUsers = async (req, res) => {
	try {
		const allProducts = await contenedorUsers.getAllUsers();
		res.status(200).json(allProducts);
	} catch (e) {
		res
			.status(501)
			.json({ status: 'ERROR', message: 'No se pueden encontrar items' });
	}
};

// mete informacion real que viene desde front y registra usuario con contraseña encriptada
export const signIn = async (req, res) => {
	const { userName, password, name, lastName, profilePicture } = req?.body;
	if (!userName || !password || !name || !lastName || !profilePicture) {
		res.status(500).json({
			status: 'error',
			message: 'Algun campo viene vacio',
		});
		return;
	}
	const existingUser = await contenedorUsers.findOneUser(userName);
	if (existingUser) {
		res.status(500).json({
			status: 'error',
			message: 'Usuario ya existe',
		});
	} else {
		const hasehdPassword = await bcrypt.hash(password, genSaltSync(10));
		try {
			await contenedorUsers.registerNewUser({
				userName,
				password: hasehdPassword,
				isAdmin: false, // esto tiene que cambiar, ahora esta hardcodeado
				name,
				lastName,
				profilePicture,
			});
			await contenedorLogs.saveOneLog({
				title: `Se crea un usuario`,
				descripcion: userName,
				link: 'url del producto en fron',
			});
			res.status(200).json({
				status: 'success',
				message: 'Usuario registrado correctamente',
			});
		} catch (e) {
			res.status(500).json({
				status: 'error',
				message: 'Algo salio mal al registrar usuario',
			});
		}
	}
};

// valida la password y username, y valida que tipo de usuario es
export const login = async (req, res) => {
	try {
		const resultingUser = await contenedorUsers.findOneUser(req.body.userName);
		if (resultingUser) {
			const isValid = await bcrypt.compare(
				req.body.password,
				resultingUser.password
			);
			const { name, lastName, profilePicture, userName, _id } = resultingUser;
			if (!isValid) {
				return res.status(400).json({
					status: 'error',
					message: 'Contraseña incorrecta',
				});
			} else {
				if (resultingUser.isAdmin) {
					req.session.userName = req.body.userName;
					req.session.isAdmin = true;
					req.session.isAuth = true;
					res.status(200).json({
						status: 'success',
						message: 'Acceso correcto',
						type: 'admin',
						sessionId: req.session.id,
						userData: { name, lastName, profilePicture, userName, _id },
					});
				} else {
					req.session.userName = req.body.userName;
					req.session.isAdmin = false;
					req.session.isAuth = true;
					res.status(200).json({
						status: 'success',
						message: 'Acceso correcto',
						type: 'regular',
						sessionId: req.session.id,
						userData: { name, lastName, profilePicture, userName, _id },
					});
				}
			}
		} else {
			res.status(501).json({
				status: 'error',
				message: 'No hay usuario con ese nombre',
			});
		}
	} catch (e) {
		res.status(501).json({
			status: 'ERROR',
			message: 'No se puede acceder al sistema en este momento',
		});
	}
};

export const isLogged = async (req, res) => {
	if (req.session.isAuth) {
		const resultingUser = await contenedorUsers.findOneUser(
			req.session.userName
		);
		if (!resultingUser) throw new Error();
		const { name, lastName, profilePicture, _id } = resultingUser;
		res.status(200).json({
			userName: req.session.userName,
			isAuth: req.session.isAuth,
			session: req.session.id,
			isAdmin: req.session.isAdmin,
			userData: { name, lastName, profilePicture, _id },
		});
	} else {
		res.status(200).json({
			isAuth: false,
		});
	}
};

export const logout = (req, res) => {
	try {
		req.session.destroy();
		res.clearCookie('session-id');
		res.status(200).json({
			status: 'success',
			message: 'Session cerrada',
		});
	} catch (e) {
		res
			.status(500)
			.json({ status: 'error', message: 'Algo salio mal al hacer logout' });
	}
};

export const convert = async (req, res) => {
	const { _id, userName } = req?.body;
	if (!_id || !userName)
		res.status(500).json({
			status: 'error',
			message: 'Algo salio mal al cambiar estatus de user',
		});
	try {
		const existingUser = await contenedorUsers.findOneUser(userName);
		existingUser.isAdmin = !existingUser.isAdmin;
		contenedorUsers.editOneUser(existingUser, _id);
		res.status(200).json({
			status: 'success',
			message: 'Se cambio el status del user correctamente',
		});
	} catch (e) {}
};

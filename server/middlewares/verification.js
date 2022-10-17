const verification = {
	// este middleware valida si es admin, si lo es puede eacceder a la ruta, si no, manda error
	isAdmin: (req, res, next) => {
		const currentUserStatus = JSON.parse(req.headers.isadmin);
		if (currentUserStatus === true) {
			next();
		} else {
			res.status(403).json({ error: -1, descripcion: 'Ruta no autorizada' });
		}
	},
};

export default verification;

import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import dotenv from 'dotenv';

dotenv.config();

const MongoStore = MongoDBStore(session);

const sessionStore = new MongoStore({
	uri: process.env.CONNECTION_MONGODB_URL,
	collection: 'sessions',
});

export const sessionOptions = {
	secret: process.env.CONNECTION_MONGODB_SECRET,
	name: 'session-id',
	store: sessionStore,
	cookie: {
		maxAge: 1000 * 60 * 60,
		secure: false,
	},
	resave: true,
	saveUninitialized: false,
};

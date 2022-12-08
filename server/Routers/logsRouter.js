import express from 'express';
import { ping, listAllLogs } from '../Controllers/logsController.js';

const logsRouter = express.Router();

logsRouter.get('/ping', ping);
logsRouter.get('/allLogs', listAllLogs);

export default logsRouter;

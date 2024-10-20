import express from 'express';
import { createServer } from 'node:http';
import { MigrateMessage } from './controller/index.js';

const app = express();
const server = createServer(app);
const mqttUrl = 'http://localhost:1883';
const messaging = new MigrateMessage(mqttUrl, server);

messaging.send('test');

server.listen(8800, 'localhost', () => {
    console.log('Websocket Server listen on port 8800')
})
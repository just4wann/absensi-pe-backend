import express from 'express';
import { createServer } from 'node:http';
import { MigrateMessage } from './controller/index.js';

const app = express();
const server = createServer(app);
const mqttUrl = 'http://localhost:1883';
const messaging = new MigrateMessage(mqttUrl, server);

messaging.send('test');

app.get('/', (req, res) => {
    res.status(200).send('Heeloo')
});

app.listen(8080, () => {
    console.log(`server listen on port 8080`);
})
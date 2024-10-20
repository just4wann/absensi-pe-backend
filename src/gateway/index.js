import { Server } from "socket.io";
import mqtt from "mqtt";

export class GatewayConnection {
    constructor() {}

    createSocketConnection(server) {
        const socket = new Server(server, {
            cors: {
                origin: ["http://localhost:5173"]
            }
        });
        socket.on('connection', () => {
            console.log('Client Connected to Socket')
        });
        return socket;
    }

    createMqttConnection(url, config) {
        const client = mqtt.connect(url, config);
        client.on('connect', () => {
            console.log('Connected to MQTT');
        })
        return client;
    }

    emitPayload(socket, payload) {
        return socket.emit(payload.topic, payload.message);
    }

    subscribeTopic(client, topic) {
        client.subscribe(topic, (err) => {
            if(err) {
                console.log(`Subscribe Error: ${err}`)
            }
        })
    }
}
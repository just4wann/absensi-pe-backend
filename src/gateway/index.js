import { Server } from "socket.io";
import mqtt from "mqtt";

export class GatewayConnection {
    constructor() {}

    createSocketConnection(server) {
        const socket = new Server(server);
        socket.on('connection', () => {
            console.log('Client Connected to Socket')
        })
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
        return socket.emit(payload.message, payload.topic);
    }

    subscribeTopic(client, topic) {
        client.subscribe(topic, (err) => {
            if(err) {
                console.log(`Subscribe Error: ${err}`)
            }
        })
    }

    getData(client) {
        let payload = {};
        client.on('message', (topic, msg) => {
            payload.topic = topic;
            payload.message = msg.toString();
            console.log(payload);
        })
        return payload;
    }

}
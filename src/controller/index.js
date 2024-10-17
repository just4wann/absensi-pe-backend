import { GatewayConnection } from "../gateway/index.js";

const gateway = new GatewayConnection();

export class MigrateMessage {
    constructor(url, server) {
        this.url = url;
        this.server = server;
    }

    send(topic) {
        const socket = gateway.createSocketConnection(this.server);
        const client = gateway.createMqttConnection(this.url);

        gateway.subscribeTopic(client, topic);
        const payload = gateway.getData(client);
        console.log(payload);
        gateway.emitPayload(socket, payload);
    }
}
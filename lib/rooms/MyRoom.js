"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
const colyseus_1 = require("colyseus");
const MyRoomState_1 = require("./schema/MyRoomState");
class MyRoom extends colyseus_1.Room {
    onCreate(options) {
        this.setState(new MyRoomState_1.MyRoomState());
        this.onMessage("type", (client, message) => {
            //
            // handle "type" message
            //
        });
        this.onMessage("message", (client, message) => {
            this.broadcast('messages', `(${client.sessionId}) ${message}`);
        });
        this.onMessage("move", (client, data) => {
            console.log(data);
            console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
            this.state.movePlayer(client.sessionId, data);
        });
    }
    onJoin(client, options) {
        console.log(client.sessionId, "joined!");
        this.broadcast("messages", `${client.sessionId} joined.`);
        this.state.players.set(client.sessionId, new MyRoomState_1.Player());
    }
    onLeave(client, consented) {
        console.log(client.sessionId, "left!");
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.MyRoom = MyRoom;

import { Room, Client } from "colyseus";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {

  onCreate (options: any) {
    this.setState(new MyRoomState());

    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });

    this.onMessage("message", (client, message) => {
      this.broadcast('messages', `(${client.sessionId}) ${message}`);
    })

    this.onMessage("move", (client, data) => {
      console.log(data)
      console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
      this.state.movePlayer(client.sessionId, data);
  });
  }

  

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.broadcast("messages", `${ client.sessionId } joined.`);
    this.state.players.set(client.sessionId, new Player());
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
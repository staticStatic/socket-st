import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

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
      //client.send(message)
      //console.log("woohoo", message)
    })

  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.broadcast("messages", `${ client.sessionId } joined.`);
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
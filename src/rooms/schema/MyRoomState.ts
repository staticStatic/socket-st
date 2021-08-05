import { Schema, Context, MapSchema, type } from "@colyseus/schema";

/*export class MyRoomState extends Schema {
  @type("string") mySynchronizedProperty: string = "Hello world";
}*/

export class Player extends Schema {
  @type("number") 
  x: number = 0;
  @type("number") 
  y: number = 0;
}

export class MyRoomState extends Schema {
  @type({ map: Player }) 
  players = new MapSchema<Player>();

  createPlayer(sessionId: string) {
    this.players.set(sessionId, new Player());
  }

  removePlayer(sessionId: string) {
      this.players.delete(sessionId);
  }

  movePlayer (sessionId: string, movement: any) {
    if (movement.x) {
        this.players.get(sessionId).x += movement.x * 10;

    } else if (movement.y) {
        this.players.get(sessionId).y += movement.y * 10;
    }
    
}
}
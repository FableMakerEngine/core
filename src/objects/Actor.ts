import { Point } from 'pixi.js';
import { Entity, EntityData } from 'cyclops';

/* the interface that shape the data of an actor */
export interface DataActor extends EntityData {
  name: string;
  profile: string;
}


export default class Actor extends Entity {
  protected displayName: string;

  protected exp: number;

  constructor(data: DataActor, coords: Point) {
    super(data, coords);
    this.displayName = '';
    this.exp = 0;
  }
}

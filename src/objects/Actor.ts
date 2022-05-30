import { Point } from 'pixi.js';
import { Entity, DataEntity} from 'cyclops';

/* the interface that shape the data of an actor */
export interface DataActor extends DataEntity {
  name: string;
  profile: string;
}


/**
 * the entity class that define an actor in the scene.
 * An actor is an entity that is trigger able
 * @extends Entity
 */
export default class Actor extends Entity {

  public displayName: string;
  /** @deprecated no real reason for use exp yet*/
  protected exp: number;

  constructor(data: DataActor, coords: Point) {
    super(data, coords);
    this.displayName = data.name;
    this.exp = 0;
  }
  
}

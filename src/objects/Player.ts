

import {Point} from "pixi.js";
import Actor, {DataActor} from "./Actor";

export interface DataPlayer extends DataActor {
  
}

/**
 * the Entity class who handle the player
 * It's shape is an extension of the existing actor entity class.
 * The main differences is that the player class has movement Input enbended to it.
 * by concept theirs should be only have one player
 * instance per game file
 *
 * @extends Actor
 */
export default class Player extends Actor {
  
  constructor(data: DataPlayer, coords: Point) {
    super(data,coords);
  }
}

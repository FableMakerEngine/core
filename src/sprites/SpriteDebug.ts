import { Sprite, Texture, Rectangle } from "pixi.js";
import {DEBUG} from "../Constant";

/**
 * the class that handle debug boundaries
 * @extends Sprite
 */
export class SpriteDebug extends Sprite {

  constructor(rect: Rectangle, color: number) {
    super(Texture.WHITE);
    this.anchor.set(0.5, 0.5);
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
    this.alpha = 0.5;
    this.tint = color;
  }

  public update(){
    if(DEBUG){
      this.visible = true;
    } else {
      this.visible = false;
    }
  }
}

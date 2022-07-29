import { Sprite, Texture, DisplayObject } from "pixi.js";
import { SpriteButton } from "./SpriteButton";

export class SpriteCommands extends Sprite {

  private command0: SpriteButton;
  private command1: SpriteButton;
  // private command2: SpriteButton;
  // private command3: SpriteButton;
  constructor(texture: Texture) {
    super(texture);
    this.anchor.set(0.5, 0.5);
    this.command0 = new SpriteButton(texture);
    this.command1 = new SpriteButton(texture);
    this.command1.x += this.command0.width;
    //   this.command2 = new SpriteButton(texture);
    this._width = 0;
    this._height = 0;
    this.addChild(this.command0);
    this.addChild(this.command1);
  }

  /*
  //@ts-ignore
  public override  addChild<T extends DisplayObject[]>(...children: T): T[0] {
    //@ts-ignore
    super.addChild(...children);
    let minX = 0
    let maxX = this.width
    let minY = 0
    let maxY = this.height

    for (const child of this.children as Sprite[]) {
      if (child.x < minX) {
        minX = child.x
      }
      if (child.x + child.width > maxX) {
        maxX = child.x + child.width
      }
      if (child.y < minY) {
        minY = child.y
      }
      if (child.y + child.height > maxY) {
        maxY = child.y + child.height
      }
    }
    this.width = maxX;
    this.height = maxY;

  }

  override get width() {
    return this._width
  }

  override set width(value) {
    this._width = value
  }

  override get height() {
    return this._height
  }

  override set height(value) {
    this._height = value
  }
*/

}

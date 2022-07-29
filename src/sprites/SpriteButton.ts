import { Sprite, Texture, Text} from "pixi.js";
import { style } from "Constant";

export class SpriteButton extends Sprite {

  public label: Text;

  constructor(texture: Texture, text: string = "0") {
    super(texture);
    this.anchor.set(0.5);
    this.interactive = true;
    this.label = new Text(text, style);
    this.label.anchor.set(0.5, 0.5);
    this.addChild(this.label);
  }

  public setText(value: string) {
    this.label.text = value;
  }

}

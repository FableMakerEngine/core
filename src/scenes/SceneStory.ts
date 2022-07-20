import { AssetLoader, Button, Mouse, MouseButton, Scene } from "cyclops";
import { Sprite, utils, LoaderResource, Text, TextStyle, Texture, Container } from "pixi.js";


/**
* goal : 
* -> create the background 
*/

const test = "I am a very nice text :> \n and I can produce space!";

const style = new TextStyle({
  fontFamily: "Georgia",
  fontSize: 40,
  wordWrap: true,
  wordWrapWidth: 550
});

const inventory = {
  waterBucket: true
}

interface DataStory {
  id: number;
  dialogue: string;
  goto?: number;
  choices?: {
    text: string,
    goto: number,
    conditions?: () => boolean;
    action?: () => void;
  }[];
}

const story: DataStory[] = [
  {
    id: 1,
    dialogue: "You see a strange fire under the place \n what do you do?",
    choices: [
      {
        text: "touch it",
        goto: 2
      },
      {
        text: "light it off",
        conditions: () => inventory.waterBucket === true,
        goto: 3
      }
    ]
  },
  {
    id: 2,
    dialogue: "You burned your hand off!",
    goto: -1
  },
  {
    id: 3,
    dialogue: "you extinguished the fire!",
    goto: -1
  },
];

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

export class StoryManager {

  public static currentNode: DataStory = null;
  public static id: number = -1;

  public static init() {
    this.id = 1;
    this.currentNode = this.findNode(this.id);
  }

  public static findNode(id: number) {
    return story.find(node => node.id === id);
  }

  public static hasChoices() {
    return this.currentNode.choices !== undefined;
  }

  public static hasConditions(index: number) {
    return this.currentNode.choices[index].conditions !== undefined;
  }

  public static choices() {
    return this.currentNode.choices;
  }
}
const DEBUG = true;

export class SceneStory extends Scene {

  private mouse = new Mouse();
  private leftMouse = new Button('left', MouseButton.LEFT);
  private background: Sprite;
  private paper: Sprite;
  private overlay: Sprite;
  private dialogue: Text;
  private buttons: Container;
  private okButtons: Sprite;

  public override preload() {
    super.preload();
    this.mouse.addButton(this.leftMouse);
    AssetLoader.add('background.png', 'pictures/');
    AssetLoader.add('paper.png', 'pictures/');
    AssetLoader.add('overlay.png', 'pictures/');
    AssetLoader.add('button.png', 'pictures/');
  }

  public override create(resources: utils.Dict<LoaderResource>) {
    super.create(resources);

    StoryManager.init();

    this.background = new Sprite(resources.background.texture);
    this.overlay = new Sprite(resources.overlay.texture);
    this.dialogue = new Text(test, style);
    this.dialogue.anchor.x = 0.5;
    this.dialogue.anchor.y = 0.5;
    this.dialogue.x = this.center(this.game.width);
    this.dialogue.y = this.center(this.game.height);
    const debugBox = new Sprite(Texture.WHITE);
    debugBox.anchor.x = 0.5;
    debugBox.anchor.y = 0.5;
    debugBox.x = this.game.width / 2;
    debugBox.y = this.game.height / 2;
    debugBox.width = 550;
    debugBox.height = this.dialogue.height;
    debugBox.tint = 0xff0000;
    if (DEBUG) {
      debugBox.alpha = 0.5;
    } else {
      debugBox.visible = false;
    }
    // ok button
    this.okButtons = new Sprite(resources.button.texture);
    this.okButtons.anchor.set(0.5, 0.5);
    this.okButtons.x = this.game.width / 2;
    this.okButtons.y = this.game.height / 2 + 250;
    this.okButtons.scale.set(1.5, 1.5);
    const okText = new Text('continue', style);
    okText.anchor.set(0.5, 0.5);
    this.okButtons.interactive = true;
    this.okButtons.on('pointerdown', this.onContinue.bind(this));
    this.okButtons.addChild(okText);
    this.okButtons.visible = false;

    this.addChild(this.background);
    this.addChild(this.overlay);
    this.addChild(debugBox);
    this.addChild(this.dialogue);
    this.createButtons(resources);

    this.addChild(this.okButtons);
    this.start();
  }

  public override start() {
    super.start();
    const story = StoryManager.currentNode;
    this.dialogue.text = story.dialogue;

    if (StoryManager.hasChoices()) {
      this.displayChoices();
    }

  }

  public onContinue() {
    alert("it continue!");
  }

  public displayChoices() {
    const choices = StoryManager.choices();
    for (let i = 0; i < choices.length; i++) {
      if (StoryManager.hasConditions(i)) {
        if (choices[i].conditions()) {
          const child = this.buttons.children[i] as SpriteButton;
          child.visible = true;
          child.setText(choices[i].text);
          this.buttons.children[i] = child;
        }
      } else {
        const child = this.buttons.children[i] as SpriteButton;
        child.visible = true;
        child.setText(choices[i].text);
        this.buttons.children[i] = child;
      }
    }
  }

  private createButtons(resources: utils.Dict<LoaderResource>) {
    this.buttons = new Container();
    this.addChild(this.buttons);

    for (let i = 0; i < 4; i++) {
      const button = new SpriteButton(resources.button.texture, String(i));
      button.on('pointerdown', (event) => { alert('clicked! ' + i) });

      button.on('mouseover', (event) => { button.scale.set(1.2, 1.2) });
      button.on('mouseout', (event) => { button.scale.set(1, 1) });

    //  button.anchor.set(0.5);
      button.x = (i % 2) * 400;
      button.y = Math.floor(i / 2) * 150;
      button.visible = false;
      this.buttons.addChild(button);
    }
    this.buttons.pivot.x = this.buttons.width / 2;
    this.buttons.pivot.y = this.buttons.height / 2;
    this.buttons.x = this.game.width / 2 + 150;
    this.buttons.y = this.game.height / 2 + 300;
    this.buttons.visible = true;
  }

  public center(axis: number): number {
    return axis / 2;
  }
}

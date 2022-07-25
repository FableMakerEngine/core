import { AssetLoader, AudioLoader, Button, Mouse, MouseButton, Scene } from "cyclops";
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
  id: string;
  dialogue: string;
  action?: () => void;
  goto?: string;
  choices?: {
    text: string,
    goto: string,
    conditions?: () => boolean;
    action?: () => void;
  }[];
}

const story: DataStory[] = [
  {
    id: 'start',
    dialogue: "You see a strange fire under the place \n what do you do?",
    choices: [
      {
        text: "touch it",
        goto: 'burned'
      },
      {
        text: "light it off",
        conditions: () => inventory.waterBucket === true,
        goto: 'extinguished'
      },
      {
        text: "You wonder where there's a lit fire in this place.",
        conditions: () => inventory.waterBucket === true,
        goto: 'looking'
      },
      {
        text: "light it off",
        conditions: () => inventory.waterBucket === true,
        goto: 'extinguished'
      }
    ]
  },
  {
    id: 'burned',
    dialogue: "You burned your hand off!",
    goto: 'GAME_OVER'
  },
  {
    id: 'extinguished',
    dialogue: "you extinguished the fire!",
    goto: 'GAME_OVER'
  },
  {
    id: 'looking',
    dialogue: "It is true that the fire is placed to quite the unusual place",
    goto: 'start'
  }
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
  public static id: string = 'notStarted';

  public static init() {
    this.id = 'start';
    this.currentNode = this.findNode(this.id);
  }

  public static findNode(id: string) {
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

  public static progress(index: string) {
    this.id = index;
    this.currentNode = this.findNode(index);
  }

  public static executeAction(){
    this.currentNode.action();
  }

  public static executeChoiceAction(index:number){
    this.currentNode.choices[index].action();
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
  private okButtons: SpriteButton;

  public override preload() {
    super.preload();
    this.mouse.addButton(this.leftMouse);
    AssetLoader.add('background.png', 'pictures/');
    AssetLoader.add('paper.png', 'pictures/');
    AssetLoader.add('overlay.png', 'pictures/');
    AssetLoader.add('button.png', 'pictures/');
    AudioLoader.add('Dungeon6.ogg','bgm/');
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
    this.okButtons = new SpriteButton(resources.button.texture, 'Continue');
    this.okButtons.anchor.set(0.5, 0.5);
    this.okButtons.x = this.game.width / 2;
    this.okButtons.y = this.game.height / 2 + 250;
    this.okButtons.scale.set(1.5, 1.5);
    this.okButtons.interactive = true;
    this.okButtons.on('pointerdown', this.onContinue.bind(this));
    this.okButtons.visible = false;
    this.okButtons.on('mouseover', (event) => { this.okButtons.scale.set(1.2, 1.2) });
    this.okButtons.on('mouseout', (event) => { this.okButtons.scale.set(1, 1) });
    this.addChild(this.background);
    console.log(AudioLoader.get('Dungeon6').sound);
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
   // AudioLoader.playBgm('dungeon6',1);
  }

  public onContinue() {
    const story = StoryManager.currentNode.goto;
    StoryManager.progress(story);
    this.refresh();
  }

  public displayChoices() {
    const choices = StoryManager.choices();
    for (let i = 0; i < choices.length; i++) {
      const child = this.buttons.children[i] as SpriteButton;
      if (StoryManager.hasConditions(i)) {
        if (choices[i].conditions()) {

          child.visible = true;
          child.setText(choices[i].text);
          this.buttons.children[i] = child;
        }
      } else {
        child.visible = true;
        child.setText(choices[i].text);
        this.buttons.children[i] = child;
      }

      if (child.label.width > child.width) {
        child.label.scale.set(0.5, 0.5);
      }
    }
  }

  public onChoice(index: number) {
    const choice = StoryManager.choices()[index];
    StoryManager.progress(choice.goto);
    this.refresh();
  }

  public refresh() {
    const story = StoryManager.currentNode;
    this.removeButtons();
    this.dialogue.text = story.dialogue;
    if (StoryManager.hasChoices()) {
      this.displayChoices();
    } else if (story.goto === 'GAME_OVER') {
      alert("GAMEOVER");
    } else {
      this.displayOkButton();
    }
  }

  public displayOkButton() {
    this.okButtons.visible = true;
  }

  public removeButtons() {
    for (const child of this.buttons.children) {
      child.visible = false;
    }
    this.okButtons.visible = false;
  }
  private createButtons(resources: utils.Dict<LoaderResource>) {
    this.buttons = new Container();
    this.addChild(this.buttons);

    for (let i = 0; i < 4; i++) {
      const button = new SpriteButton(resources.button.texture, String(i));
      button.on('pointerdown', this.onChoice.bind(this, i));

      button.on('mouseover', (event) => { button.scale.set(1.2, 1.2) });
      button.on('mouseout', (event) => { button.scale.set(1, 1) });

      //  button.anchor.set(0.5);
      button.x = (i % 2) * 400;
      button.y = Math.floor(i / 2) * 150;
      button.visible = false;
      this.buttons.addChild(button);
    }
    this.buttons.pivot.x = 0.5;
    this.buttons.pivot.y = 0.5;
    this.buttons.x = this.game.width / 2 - 200;
    this.buttons.y = this.game.height / 2 + 250;
    this.buttons.visible = true;
  }

  public center(axis: number): number {
    return axis / 2;
  }
}

import { AssetLoader, Button, Mouse, MouseButton, Scene } from "cyclops";
import { Sprite, utils, LoaderResource, Text, Container, Rectangle } from "pixi.js";
import { SpriteButton, SpriteCommands, SpriteDebug } from "../sprites";
import { Database } from "../management";
import { style } from "../Constant";
import { StoryManager } from "../management";

//import { sound } from '@pixi/sound';
import { AUDIO_TYPE, Audio } from "../management/Audio";


Audio.add('dungeon', 'bgm/Dungeon6.ogg', AUDIO_TYPE.BGM);

/*
sound.add('dungeon',{
  url: './assets/audio/bgm/Dungeon6.ogg',
  loaded: ()=> alert('sound is loaded!')
});
*/


/**
* goal : 
* -> create the background 
*/

const test = "I am a very nice text :> \n and I can produce space!";



export class SceneStory extends Scene {

  private mouse = new Mouse();
  private leftMouse = new Button('left', MouseButton.LEFT);
  private background: Sprite;
  private overlay: Sprite;
  private dialogue: Text;
  private buttons: Sprite;
  private okButtons: SpriteButton;
  private debugSprite: SpriteDebug;
  private testCommand: SpriteCommands;

  public override preload() {
    super.preload();
    this.mouse.addButton(this.leftMouse);
    Database.preload();
    AssetLoader.add('background.png', 'pictures/');
    AssetLoader.add('paper.png', 'pictures/');
    AssetLoader.add('overlay.png', 'pictures/');
    AssetLoader.add('button.png', 'pictures/');
    AssetLoader.add('ui.png', 'pictures/');


  }

  public override create(resources: utils.Dict<LoaderResource>) {
    super.create(resources);
    this.createBackground(resources);
    this.createOverlays(resources);
    this.createDialogue();
    this.createContinueButton(resources);
    //const rect = new Rectangle(this.game.width / 2, this.game.height / 2, 550, this.dialogue.height);
    //const debugBox = new SpriteDebug(rect, 0xff0000);

    // this.addChild(debugBox);
    this.testCommand = new SpriteCommands(resources.button.texture);
    this.testCommand.x = this.game.width / 2;
    this.testCommand.y = this.game.height / 2;
    //  this.createButtons(resources);
    const red = utils.rgb2hex([1, 0, 0]);
    const blue = utils.rgb2hex([0, 0, 1]);
    this.debugSprite = new SpriteDebug(new Rectangle(this.testCommand.width / 2, 0, this.testCommand.width, this.testCommand.height), red);
   // const dot = new SpriteDebug(new Rectangle(this.testCommand.width / 2, 0, 10, 10), blue);

    //console.log([debugSprite.width,debugSprite.height]);
    // const dot = new SpriteDebug(new Rectangle(this.buttons.width / 2, this.buttons.height / 2, 10, 10), blue);
    this.addChild(this.testCommand);
  //  this.testCommand.addChild(this.debugSprite);
 //   this.testCommand.addChild(dot);
    Database.init();
    StoryManager.init(Database.$dataStory);
    this.start();

  }

  private createBackground(resources: utils.Dict<LoaderResource>) {
    this.background = new Sprite(resources.background.texture);
    this.addChild(this.background);
  }

  private createOverlays(resources: utils.Dict<LoaderResource>) {
    this.overlay = new Sprite(resources.overlay.texture);
    this.addChild(this.overlay);
  }

  private createDialogue() {
    this.dialogue = new Text(test, style);
    this.dialogue.anchor.x = 0.5;
    this.dialogue.anchor.y = 0.5;
    this.dialogue.x = this.center(this.game.width);

    this.dialogue.y = this.center(this.game.height);

    this.addChild(this.dialogue);
  }

  private createContinueButton(resources: utils.Dict<LoaderResource>) {
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
    this.addChild(this.okButtons);
  }

  public override start() {
    super.start();

    const story = StoryManager.currentNode;
    this.dialogue.text = story.dialogue;
    if (StoryManager.hasChoices()) {
      //   this.displayChoices();
    }
    //  Audio.play('dungeon', 0.1);
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
        const condition = StoryManager.conditions(i);
        if (condition) {

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
    if (StoryManager.hasAction(index)) {
      console.log("it went there");
      StoryManager.executeChoiceAction(index);
    }
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
    this.buttons = new Sprite();
    this.addChild(this.buttons);

    for (let i = 0; i < 4; i++) {
      const button = new SpriteButton(resources.button.texture, String(i));
      console.log(`the button_${i} has a size of ${button.width},${button.height}`);
      //  button.on('pointerdown', this.onChoice.bind(this, i));

      button.on('mouseover', (event) => { button.scale.set(1.2, 1.2) });
      button.on('mouseout', (event) => { button.scale.set(1, 1) });

      //  button.anchor.set(0.5);
      button.x = (i % 2) * 400;
      button.y = Math.floor(i / 2) * 150;
      button.visible = false;
      this.buttons.addChild(button);
    }
    this.buttons.anchor.set(0.5, 0.5);

    this.buttons.x = this.game.width / 2 // - 200;

    this.buttons.y = this.game.height / 2 //+ 250;
    this.buttons.visible = true;
    const blue = utils.rgb2hex([0, 0, 1]);
    const red = utils.rgb2hex([1, 0, 0]);
    this.debugSprite = new SpriteDebug(new Rectangle(this.buttons.width / 2, this.buttons.height / 2, this.buttons.width, this.buttons.height), red);
    //console.log([debugSprite.width,debugSprite.height]);
    // const dot = new SpriteDebug(new Rectangle(this.buttons.width / 2, this.buttons.height / 2, 10, 10), blue);

    this.buttons.addChild(this.debugSprite);
    // this.buttons.addChild(dot);
    console.log(`the scene container size is : ${this.width},y: ${this.height}`);
    console.log(`the buttons container coords is : ${this.buttons.x}, ${this.buttons.y}`);
    console.log(`the buttons container size is : ${this.buttons.width}, ${this.buttons.height}`);
  }

  public center(axis: number): number {
    return axis / 2;
  }

  public override update(dt: number) {
    super.update(dt);
  }
}

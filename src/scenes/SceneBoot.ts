import { Scene, AssetLoader, Keyboard, Key, Entity } from 'cyclops';
import {utils, LoaderResource, Rectangle, Point } from 'pixi.js'

export default class Boot extends Scene {
  private entity: Entity;

  private keyboard = new Keyboard();

  private enterKey = new Key('Enter');

  private leftKey = new Key('ArrowLeft');

  public override preload() {
    super.preload();
    this.keyboard.addKey(this.enterKey);
    this.keyboard.addKey(this.leftKey);
    AssetLoader.add('shroom.png', 'pictures/');
  }

  public override create(resources: utils.Dict<LoaderResource>) {
    super.create(resources);

    const entity = {
      data: {
        id: 'shroom',
        sprite: {
          filename: resources.shroom.texture,
          index: 0,
          fps: 0,
        },
        collision: new Rectangle(0, 0, 0, 0),
      },
      coords: new Point(
        this.game.width / 2,
        this.game.height / 2,
      ),
    };
    this.entity = new Entity(entity.data, entity.coords);
    this.addChild(this.entity);
  }

  public override update(dt?: number) {
    if (this.keyboard.isKeyDown(this.enterKey)) {
      this.game.sceneLoader.change('map');
    }
    if (this.keyboard.isKeyDown(this.leftKey)) {
      this.entity.rotation -= 0.1 * dt;
    }
  }

  // public override resize(width: number, height: number): void {}
}

import { utils, LoaderResource } from 'pixi.js';

import { AssetLoader, Scene, Tilemap, ITilemapConfig, ldtkParser } from 'cyclops';

export default class SceneMap extends Scene {
  private tilemap: Tilemap;

  public currentMapId: number;

  public override preload() {
    super.preload();
    AssetLoader.add('classic_rpg.png', 'tilesets');
    AssetLoader.addMap('map1.json');
  }

  public override create(resources: utils.Dict<LoaderResource>) {
    super.create(resources);
    const { layers, levels, tilesets } = ldtkParser.fullParse('map1', resources);
    const level = levels[0];
    const config: ITilemapConfig = {
      tilesets,
      layers,
      level,
    };
    this.tilemap = new Tilemap(config);
    this.addChild(this.tilemap);
    setTimeout(() => {
      this.game.sceneLoader.change('boot');
    }, 2000);
  }
}

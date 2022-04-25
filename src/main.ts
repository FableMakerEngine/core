import { Game } from 'cyclops';

import Boot from './scenes/SceneBoot';
import Map from './scenes/SceneMap';

window.onload = () => {
  const game = Game.getInstance();
  game.sceneLoader.add(new Map() , 'map');
  game.sceneLoader.add(new Boot(), 'boot');
  game.sceneLoader.change('boot');
};

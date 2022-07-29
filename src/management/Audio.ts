import { utils } from 'pixi.js';
import { SoundLibrary } from '@pixi/sound';

export enum AUDIO_TYPE {
  BGM,
  ME,
  SE
}
export class Audio {

  public static readonly rootPath = 'assets/audio/';

  private static loadedSound: { alias: string, type: AUDIO_TYPE, loaded: boolean }[] = [];
  private static emitter = new utils.EventEmitter();
  private static library = new SoundLibrary();

  public static on(event: string, listener: (...args: any[]) => void) {
    this.emitter.on(event, listener);
  }

  public static readonly PATH = {
    bgm: 'bgm/',
    me: 'me/',
    se: 'se/',
  };

  public static add(alias: string, filename: string, type: AUDIO_TYPE) {
    const isLoop = type === AUDIO_TYPE.BGM ? true : false;

    this.library.add(alias, {
      url: this.rootPath + '/' + filename,
      loop: isLoop,
      loaded: () => { this.onLoaded(alias, type) }
    });
  }

  public static play(alias: string, volume = 1){
    const s = this.library;
    s.volume(alias,volume);
    s.play(alias);
  }

  private static onLoaded(alias: string, type: AUDIO_TYPE) {
    this.loadedSound.push({ alias: alias, type: type, loaded: true });
  }

  public static isLoaded() {
    for (const sound of this.loadedSound) {
      if (!sound.loaded) {
        return false;
      }
    }
    return true;
  }
}

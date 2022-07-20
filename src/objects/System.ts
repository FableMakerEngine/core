import { Vector2 } from "cyclops";

/**
 * The class that handle all System parameters.
 * such as tileset size, pixel mode , mouse
 * it is initialized on startup and can be edited on runtime and saved in a savefile
 */
export class System {
  
  private mouse: boolean;
  private keyboard: boolean;
  private screenSize: Vector2;
  private tileSize: Vector2;

  // for custom system setting
  private custom: Map<string,any>;

  constructor(){
    this.mouse = true; // in the later date it would read the editor ?
    this.keyboard = true;
    this.screenSize = new Vector2(680,680); // @todo maybe? not to sure if it should go there or on a Graphic class.
    this.tileSize = new Vector2(32,32);
    this.custom = new Map(); // allow the player to add custom new rules without needing to edit the code
  }

  /**
   * wether the game has mouse support or not
   * @returns {boolean}
   */
  public hasMouseSupport(): boolean {
    return this.mouse;
  }

  /**
   * enable or disable mouse support
   * @param {boolean} flag - the flag to set the mouse on and off
   */
  public setMouseSupport(flag: boolean){
    this.mouse = flag;
  }

  public hasKeyboardSupport(): boolean {
    return this.keyboard
  }

  public setKeyboardSupport(flag: boolean) {
    this.keyboard = flag;
  }

  public tileWidth(): number {
    return this.tileSize.x;
  }

  public tileHeight(): number {
    return this.tileSize.y;
  }

  public setTilesize(x: number,y: number){
    this.tileSize = new Vector2(x,y);
  }

  public getCustomSetting<T>(name:string): T {
    if(this.custom.has(name)){
      return this.custom.get(name);
    }
  }

}

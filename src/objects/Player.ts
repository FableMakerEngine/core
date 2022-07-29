

interface PlayerData {
  name: string;

}

/**
 * the Entity class who handle the player
 * It's shape is an extension of the existing actor entity class.
 * The main differences is that the player class has movement Input enbended to it.
 * by concept theirs should be only have one player
 * instance per game file
 *
 */
export class Player  {

  public name: string;
  public stats: {}
  public inventory: {}
  
  constructor() {

  }

  public restoreData(data: PlayerData){

  }
}

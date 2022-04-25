import ItemBase from './objects/ItemBase';

export default class Inventory {
  private inventory: Record<string, ItemBase>;

  constructor() {
    this.inventory = {};
  }

  public addItem(_id: number) {
    this.inventory = {};
  }
}

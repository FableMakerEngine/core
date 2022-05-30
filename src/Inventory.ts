import ItemBase, {DataItem} from './objects/ItemBase';

/*  TEMP */
const DATABASE: DataItem[] = [
  null
];

/**
 * @todo swap this to cyclops
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min((Math.max(value, min), max));
}

export default class Inventory {

  private readonly inventory: ItemBase[];

  /* temporary to move to an actual class **/
  private readonly MAX_ITEM = 99;

  constructor() {
    this.inventory = [];
  }

  /**
   * add an item to the inventory.
   * @param {number} id - the item inventory
   * @param {number} amount - the number of item to add
   */
  public addItem(id: number, amount = 1) {
    if (this.isInInventory(id)) {
      for (const item of this.inventory) {
        if (item.id === id) {
          if (item.amount < this.MAX_ITEM) {
            item.amount = clamp(item.amount + amount, 0, this.MAX_ITEM);
          }
        }
      }
    } else {
      const item = DATABASE[id];
      // @todo in the later make that we can have multiple type of items?
      this.inventory.push(new ItemBase(item, amount));
    }
  }

  public removeItem(id: number, amount = 1){
    if(!this.isInInventory(id)){
      return;
    }
    for(const item of this.inventory){
      if(item.id === id){
        if(item.amount)
      }
    }
  }

  /**
   * return whether an item is in the inventory or not
   * @param {number} id - the item id
   * @returns {boolean}
   */
  public isInInventory(id: number): boolean {
    return this.inventory.some(item => {
      return item.id === id;
    })
  }


}

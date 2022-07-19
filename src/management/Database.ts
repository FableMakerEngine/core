import { AssetLoader } from "cyclops";
import ItemBase from "../objects/ItemBase";


export class Database {

  private static registry = new Map();

  public static $dataItems: ItemBase[];

  public static init() {
    this.buildRegistry();
    this.$dataItems = this.get('items');
  }

  private static buildRegistry() {
    this.add('items', 'DataItems');
  }

  public static add(key: string, json: string) {
    const data = AssetLoader.getData(json);
    if (!this.registry.has(key)) {
      this.registry.set(key, data);
    } else {
      throw new Error(`the data ${key} is already assigned!`);
    }
  }

  public static get(key: string): any {
    if (!this.registry.has(key)) {
      throw new Error(`the data ${key} doesn't exist`);
    } else {
      return this.registry.get(key);
    }
  }
}

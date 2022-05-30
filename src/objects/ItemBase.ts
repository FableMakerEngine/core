/**
 * the most basic data shape of an item
 */
import { Resource, Texture } from 'pixi.js';
import {AssetLoader} from 'cyclops';

export interface DataItem {
  id: number;
  name: string;
  icon: string;
  description: string;
}

/**
 * the super class of items and skill in the game
 */
export default class ItemBase {

  /**
   * the item ID
   * @todo maybe make the id an integer instead?
   * @type {number}
   */
  public id: number;

  /**
   * the item name
   * @type {string}
   */
  public name: string;

  /**
   * the item icon
   * @type {Texture}
   * @todo should the icon be just an index instead since it's already loaded?
   */
  public icon: Texture;

  /**
   * the item description
   * @type {string}
   */
  public description: string;

  /**
   * the item amount
   * @type {number}
   */
  public amount: number;

  /**
   * will init an instance of the item
   * @param {DataItem} data - the item json data
   * @param {number} amount - the number of item to add
   */
  constructor(data: DataItem, amount = 1) {
    this.id = data.id;
    this.name = data.name;
    this.icon = ItemBase.fetchTextureIcon(data.icon);
    this.description = data.description;
    this.amount = amount;
  }

  /**
   * fetch the loaded texture
   * @todo should the Item just load the icon?
   * @param {string} icon
   * @returns {Texture<Resource>}
   * @private
   */
  private static fetchTextureIcon(icon: string): Texture<Resource> {
    return AssetLoader.get(icon).texture;
  }
}

import { Database } from "./Database";
import {Evaluator} from "./Evaluator";

export interface DataStory {
  id: string;
  dialogue: string;
  action?: string;
  goto?: string;
  choices?: {
    text: string,
    goto: string,
    conditions?: string;
    action?: string;
  }[];
}
/*
const story: DataStory[] = [
  {
    id: 'start',
    dialogue: "You see a strange fire under the place \n what do you do?",
    choices: [
      {
        text: "touch it",
        goto: 'burned'
      },
      {
        text: "light it off",
        conditions: () => inventory.waterBucket === true,
        goto: 'extinguished'
      },
      {
        text: "You wonder where there's a lit fire in this place.",
        conditions: () => inventory.waterBucket === true,
        goto: 'looking'
      },
      {
        text: "light it off",
        conditions: () => inventory.waterBucket === true,
        goto: 'extinguished'
      }
    ]
  },
  {
    id: 'burned',
    dialogue: "You burned your hand off!",
    goto: 'GAME_OVER'
  },
  {
    id: 'extinguished',
    dialogue: "you extinguished the fire!",
    goto: 'GAME_OVER'
  },
  {
    id: 'looking',
    dialogue: "It is true that the fire is placed to quite the unusual place",
    goto: 'start'
  }
];
*/

export class StoryManager {

  public static currentNode: DataStory;
  public static id: string = 'notStarted';
  private static story: DataStory[];
  /*
  public static inventory  = {
    waterBucket: false
  }
  */
  

  public static init(story: DataStory[]) {
    this.story = story;
    this.id = 'start';
    this.currentNode = this.findNode(this.id);
  }

  public static findNode(id: string): DataStory {
    //@ts-ignore
    return this.story.find(node => node.id === id);
  }

  public static hasChoices() {
    return this.currentNode?.choices !== undefined;
  }

  public static hasConditions(index: number) {
    //@ts-ignore
    return this.currentNode.choices[index].conditions !== undefined;
  }

  public static conditions(index: number): boolean {
    const condition = this.currentNode.choices[index].conditions;
    return Evaluator.eval(condition,null,true);
  }

  public static choices() {
    return this.currentNode?.choices;
  }

  public static progress(index: string) {
    this.id = index;
    this.currentNode = this.findNode(index);
  }

  public static hasAction(index: number){
    if(index === -1){
      return this.currentNode.action !== undefined;
    } else {
      return this.currentNode.choices[index].action !== undefined;
    }
  }
  public static executeAction() {
    //@ts-ignore
    window.eval(this.currentNode.action);
  }

  public static executeChoiceAction(index: number) {
    //@ts-ignore
    window.eval(this.currentNode.choices[index].action)
  }
}

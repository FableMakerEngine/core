export interface StoryNode {
  id: number;
  dialogue: string;
  goto?: number;
  actions?: () => void;
}
export interface ChoiceNode extends StoryNode {
  choices: {
    text: string;
    conditions?: (state?) => boolean;
    action?: () => void;
    goto: number | "() => number";
  }[]
}

export interface ImageNode extends StoryNode {
  texture: string,
}


export class StoryManager {

  private static stories: Map<string, StoryNode[]>
  private static node: StoryNode | null | undefined;
  private static nodeId: number;
  private static currentStory: string;

  public static init() {
    this.stories = new Map();
    this.node = null;
    this.nodeId = -1;
    this.currentStory = '';
  }

  public static start(story: string){
    this.nodeId = 0;
    this.currentStory = story;
    const id = this.nodeId;
    this.node = this.stories.get(story)?.find((story) => {story.id === id});
  }

  public static continue(){
    
  }

  public static createStory(name: string) {
    if (this.stories.has(name)) {
      throw new Error(`The story ${name} has already been registred!`);
    }
    this.stories.set(name, []);
  }

  public static addText(story: string, node: StoryNode) {
    if (!this.stories.has(story)) {
      throw new Error(`The story ${story} doesn't exists!`);
    }
    this.stories.get(story)?.push(node);
  }

  public static addChoice(story: string, node: ChoiceNode) {
    if (!this.stories.has(story)) {
      throw new Error(`The story ${story} doesn't exists!`);
    }
    this.stories.get(story)?.push(node);
  }

  public static addImage(story: string, node: ImageNode) {
    if (!this.stories.has(story)) {
      throw new Error(`The story ${story} doesn't exists!`);
    }
    this.stories.get(story)?.push(node);
  }


}

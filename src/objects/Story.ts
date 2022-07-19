import { StoryManager as flow } from "../management";

enum GOTO_TYPE {
  START = 1,
  CLOSE = 0,
  GAME_OVER = 9999,
  END = -1
}

let i = 0;
// function to avoid the problem with anonymous expression in object
function condition<T>(condition, a, b): T {
  return condition ? a : b;
};
// create the story
flow.createStory('test_01');

// add a new simple text node to the storyflow
flow.addText('test_01', {
  id: GOTO_TYPE.START,
  dialogue: "",
  goto: condition(i > 1, 0, 2)
});

// add a new choice node to the storyflow
flow.addChoice('test_01', {
  id: 1,
  dialogue: "",
  choices : [
    {
      text: "",
      goto: 1
    },
    {
      text: "something",
      action: ()=> i = 3,
      goto: GOTO_TYPE.GAME_OVER
    }
  ]
});

/*
interface storyNode {
  id: number;
  dialogue: string;
  choices?: {
    text: string;
    conditions?: (state?) => boolean;
    action? : ()=> void;
    goto: number;
  }[]

  goto?: number
}

export interface imageNode extends storyNode {
  texture: string,
}

let test = 0;
export let story01: storyNode[] = [
  {
    id: 0,
    dialogue : "",
    choices : [
      {
        text: "",
        goto: 2,
        conditions: () => test >= 10
      }
    ]
  }
]
*/



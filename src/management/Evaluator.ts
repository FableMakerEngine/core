
import { Inventory } from "./Inventory";


/**
 * based on DEKITA_RPG work
 * @author Dekita
 */

export class Evaluator {
  
  public static eval(statement: string, context: Object,isReturning = true,argz = {}){
    const evalStr = this.prepareStatement(statement,isReturning);
    const evalArgz = this.createArgs(argz);
    const evalKeys = Object.keys(evalArgz);
    const evalVals = Object.values(evalArgz);
    const func = new Function(...evalKeys,evalStr);
    return func.apply(context, evalVals);
  }

  private static createArgs(args: Object){
    const mainArgs = {
      ...args,
      'inventory': Inventory
    };
    return mainArgs;
  }
  private static prepareStatement(statement: string, isReturning: boolean): string {
    const returnStr = isReturning ? 'return ' : '';
    return `"use strict"; ${returnStr}${statement}`;
  }
}

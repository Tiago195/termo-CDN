import { IAttempt } from "./IAttempt"

export interface IMatch {
  letters: string[]
  historyLetters: string[]
  historyAttempts:  IAttempt[][][]
  chance: number
  maxChance: number
  currentClipboard: number
  isCorrect: boolean[]
}

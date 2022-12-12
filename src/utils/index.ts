import json from '../db.json'
import { IAttempt } from '../interfaces/IAttempt';
import { IColor } from '../interfaces/IColor';
import { IConfig } from '../interfaces/IConfig';
import { ICurrentAttempt } from '../interfaces/ICurrentAttempt';
import { IMatch } from '../interfaces/IMatch';

export const getRandomLetter = () => replaceSpecialChars(json[Math.trunc(Math.random() * 1000)])

export const findInDb = (letter: string) => {
  return json.find(e => replaceSpecialChars(e) === letter)
}

export const replaceSpecialChars =(str: string) => {
  str = str.replace(/[aáàãäâ]/g, "a");
  str = str.replace(/[eéèëê]/g, "e");
  str = str.replace(/[iíìïî]/g, "i");
  str = str.replace(/[oóòõöô]/g, "o");
  str = str.replace(/[uúùüû]/g, "u");
  str = str.replace(/[ç]/g, "c");

  return str
}

export const defaultAttempt: IAttempt[] = [
  {
    "include": false,
    "position": false,
    "key": ""
  },
  {
    "include": false,
    "position": false,
    "key": ""
  },
  {
    "include": false,
    "position": false,
    "key": ""
  },
  {
    "include": false,
    "position": false,
    "key": ""
  },
  {
    "include": false,
    "position": false,
    "key": ""
  }
]

const optionsMatch = () => ({
  Solo: {
    letters: [getRandomLetter()],
    maxChance: 6,
    isCorrect: [false]
  },
  Dueto: {
    letters: [getRandomLetter(), getRandomLetter()],
    maxChance: 7,
    isCorrect: [false, false]
  },
  Quarteto: {
    letters: [getRandomLetter(), getRandomLetter(), getRandomLetter(), getRandomLetter()],
    maxChance: 9,
    isCorrect: [false, false, false, false]
  }
})

export const defaultMatch = (option: 'Solo' | 'Dueto' | 'Quarteto') :IMatch => {
  const mode = optionsMatch()[option];
  return {
    letters: mode.letters,
    historyLetters: [],
    historyAttempts: [],
    chance: 0,
    maxChance: mode.maxChance,
    currentClipboard: 0,
    isCorrect: mode.isCorrect
  }
}

export const defaultCurrentAttempt: ICurrentAttempt = {
  letter: '',
  attempt: defaultAttempt
}

export const validLetter = (letter: string[], tryLetter: string[]) => {
  const targetObjet = letter.reduce<any>((a, b) => {
    if (a[b] !== undefined) a[b] = a[b] + 1
    else a[b] = 1
    return a
  }, {})

  const validGreen: IAttempt[] = letter.map<IAttempt>((e, i) => {
    if (e === tryLetter[i] && targetObjet[tryLetter[i]] > 0) {
      targetObjet[e] -= 1
      
      return {
        include: true,
        position: true,
        key: tryLetter[i]
      }
    }
    
    return {
      include: false,
      position: false,
      key: tryLetter[i]
    }
  })
  
  const validYellow: IAttempt[] = validGreen.map<IAttempt>((e, i) => {
    if (letter.includes(e.key) && targetObjet[e.key] > 0 && !e.position) {
      targetObjet[e.key] -=1
      return {
        include: true,
        position: false,
        key: e.key
      }
    }
    return e
  })
  
  return validYellow
}

export const defaultColor:IColor = {
  success: 'green.500',
  warning: 'yellow.500',
  default: 'black.500'
}

const defaultConfig: IConfig = {
  nilceMode: false,
  colors: {
    default: 'black.500',
    success: 'green.500',
    warning: 'yellow.500'
  },
  dificult: 'Solo'
}

export const getStorage = (item: string) => (JSON.parse(localStorage.getItem(item) as string) as IConfig) || defaultConfig

export const setStorage = (item: string, key: "nilceMode" | "colors" | "dificult", value: any) => {
  const oldValue = getStorage(item);

  localStorage.setItem(item, JSON.stringify({...oldValue, [key]: value}))
}
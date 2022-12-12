import { IColor } from "./IColor"

export interface IConfig {
  nilceMode: boolean
  colors: IColor
  dificult: 'Solo'| 'Dueto' | 'Quarteto'
}
import type { IImage } from './Common.ts'

export interface INews {
  id: string
  titleImg: IImage
  title: string
  description: string
  created: Date
}

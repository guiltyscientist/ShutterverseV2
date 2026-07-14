import type {IImage} from './Common.ts';

export interface IStudio {
  id: string
  title: string
  description: string | null
  equipment: string | null
  titleImg: IImage
  images: IImage[]
  inspiredBy: string[]
  bookingUrl: string | null
  showNewBadge: boolean
}

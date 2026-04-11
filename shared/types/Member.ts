import type { IImage } from './Common.ts'

export interface ISocialMedia {
  platform: string
  url: string
}

export interface IMember {
  id: string
  profilImg: IImage
  firstName: string
  lastName: string
  roles: string[]
  description: string | null
  socialMedia: ISocialMedia[]
}

import { AuditKeys } from "../../../app/api/models/audit-keys"

type ImageFormat = {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}
export type Image = {
  id: number
  attributes: {
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: {
      thumbnail: ImageFormat
      medium: ImageFormat
      small: ImageFormat
      large: ImageFormat
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    // provider: "local" //?
    // provider_metadata: null //?
  } & AuditKeys
}

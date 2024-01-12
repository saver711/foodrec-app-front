import { AuditKeys } from "../../../app/api/models/audit-keys"
import { Locale } from "../../../localization/models/locale.model"
import { Image } from "../../shared/models/image.model"

export type Blogger = {
  id: number
  attributes: {
    name: string
    locale: Locale
    image:{data: Image}
    recommendations: {
      data: [
        {
          id: number
          attributes: {
            quote: string
            rating: number
            locale: Locale
            date: Date
            url: string
          } & AuditKeys
        }
      ]
    } & AuditKeys
  }
}

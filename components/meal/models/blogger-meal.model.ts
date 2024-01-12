import { AuditKeys } from "../../../app/api/models/audit-keys"
import { Locale } from "../../../localization/models/locale.model"
import { Image } from "../../shared/models/image.model"

export type BloggerMeal = {
  id: number
  attributes: {
    name: string
    locale: Locale
    recommendations: {
      data: [
        {
          id: number
          attributes: {
            quote: string
            rating: number
            locale: Locale
            date: null
            url: null
            blogger: {
              data: {
                id: number
                attributes: {
                  name: string
                  locale: Locale
                  image: {
                    data: Image
                  }
                } & AuditKeys
              }
            }
          } & AuditKeys
        }
      ]
    }
    images: {
      data: Image[]
    }
  } & AuditKeys
}

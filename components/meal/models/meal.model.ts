import { AuditKeys } from "../../../app/api/models/audit-keys"
import { Locale } from "../../../localization/models/locale.model"
import { Image } from "../../shared/models/image.model"

export type Meal = {
  id: number
  attributes: {
    name: string
    locale: Locale
    recommendations: {
      data: {
        id: 5
        attributes: {
          quote: string
          rating: number | null
          locale: Locale
          date: Date
          url: string
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
      }[]
    }
    images: {
      data: Image[]
    }
  } & AuditKeys
}

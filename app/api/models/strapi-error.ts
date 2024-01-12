import { HttpStatusCode } from "axios"

export type StrapiError = {
    response: {
      data: {
        error: {
          status: HttpStatusCode;
          message?: string;
          details: {
            errors?: {
              message: string;
              path: string[];
            }[];
          } | {};
        };
      };
    };
  };
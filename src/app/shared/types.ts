import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Books {
  items: Book[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface Book {
  name: string;
  author: string;
  imageUrl: string;
  rating: number;
}

export interface PaginationParams {
  [param: string]:
    | string
    | number
    | boolean
    | readonly (string | number | boolean)[];
  page: number;
  perPage: number;
}

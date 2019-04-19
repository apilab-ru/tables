export interface PaginationItem {
  caption: string;
  number?: number;
  active?: boolean;
  separator?: boolean;
}

export enum SortType {
  DESC, ASC
}

export interface RowContext<T> {
  $implicit: T;
}

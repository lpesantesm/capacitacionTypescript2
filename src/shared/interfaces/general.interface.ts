export interface FieldsBase {
  id: number,
  status: boolean;
  createAt: string,
  updatedAt: string | undefined
}

export interface GetAllQueryParams {
  page: number,
  limit: number,
  status: string,
}


export interface ResponsesPaginationI<T> {
  records: T[],
  page: number,
  total: number,
  totalPage: number
}

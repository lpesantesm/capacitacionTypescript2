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

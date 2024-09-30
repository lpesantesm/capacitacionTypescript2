import { FieldsBase, GetAllQueryParams } from "@/shared/interfaces";

export interface GetAllMovieParams extends GetAllQueryParams { }

export interface MovieI extends FieldsBase {
  name: string,
  userId: number,
  description: string,
}
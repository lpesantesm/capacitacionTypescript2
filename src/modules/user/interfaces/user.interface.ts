import { FieldsBase, GetAllQueryParams } from "@/shared/interfaces";

export interface UserLoginInterface {
  username: string,
  password: string
}

export interface GetAllUserParams extends GetAllQueryParams{
  search?: string
}

export interface JsonUserI {
  body: any;
}

export interface UserI extends FieldsBase, JsonUserI{
  name: string;
  lastName: string;
}

export interface UserPartialI extends JsonUserI {
  id: number,
  fullName: string,
}
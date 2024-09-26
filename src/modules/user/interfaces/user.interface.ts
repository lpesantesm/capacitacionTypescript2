export interface UserLoginInterface {
  username: string,
  password: string
}

export interface GetAllUserParams {
  page: number,
  limit: number,
  status: string,
}

export interface UserI {
  id: number,
  body: any;
  name: string;
  status: boolean;
  lastName: string;
  createAt: string,
  updatedAt: string | undefined
}

export interface UserPartialI {
  id: number,
  fullName: string,
  body: any,
}
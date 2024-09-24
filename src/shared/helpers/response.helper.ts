
import { HTTP_CODE } from "../enum/http.code.enum";
import { ServicesResponsesInterface } from "../interfaces/responses.interface";
import { error, success } from "../constants/messages.constants";

export const serviceResponse = (
params: ServicesResponsesInterface
) => {
  params.res.statusCode = HTTP_CODE.ok;

  return params.res.json({
    data: params.data,
    message: params.message ?? success
  })
}

export const wrapperError = (
  params: ServicesResponsesInterface
) => {
  params.res.statusCode = params?.statusCode ?? HTTP_CODE.errorServer;

  return params.res.json({
    data: params.data ?? null,
    message: params.message ?? error
  })
}
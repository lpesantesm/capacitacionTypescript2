import { error, success } from '@constants/messages.constans';
import { HTTPCODE } from "../enum/http.code";
import { ServicesResponsesInterface } from "../interfaces/responses.interface";

export const serviceResponse =(
    params: ServicesResponsesInterface
) =>{
    params.res.statusCode = HTTPCODE.ok  //En lugar de 200
    return params.res.json({
        data: params.data,
        message: params.message ?? success, //En lugar del texto
    })
}

export const wrapperError = (
    params: ServicesResponsesInterface
) => {
    params.res.statusCode = params?.statusCode ?? HTTPCODE.errorServer  //en lugar de 500
    return params.res.json({
        data: params.data ?? null,
        message: params.message ?? error, //En lugar del texto
    })
}
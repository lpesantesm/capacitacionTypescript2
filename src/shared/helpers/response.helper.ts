import { HTTPCODE } from "../enum/http.code";
import { ServicesResponsesInterface } from "../interfaces/responses.interface";

export const serviceResponse =(
    params: ServicesResponsesInterface
) =>{
    params.res.statusCode = HTTPCODE.ok  //En lugar de 200
    return params.res.json({
        data: params.data,
        message: params.message ?? "Perticion realizada con exito",
    })
}

export const wrapperError = (
    params: ServicesResponsesInterface
) => {
    params.res.statusCode = HTTPCODE.errorServer  //en lugar de 500
    return params.res.json({
        data: params.data ?? null,
        message: params.message ?? "Ah sucedio un error vuelva a intentarlo",
    })
}
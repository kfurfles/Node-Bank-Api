export class CustomError extends Error{
    code: number
}

export const newError = ( options ) =>{
    let err = new Error()
    err = {
        ...options
    }
    return err
}
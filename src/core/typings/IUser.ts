export interface IUser {
    name: string
    email: string
    cpf: string
    password: string
    account: {
        amount: number,
        number: string
    },
    id: string
}
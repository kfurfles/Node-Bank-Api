import { IUser } from "../typings/IUser";

export class User implements IUser {
    name: string
    email: string
    cpf: string
    password: string
    id: string
    account: {
        amount: number,
        number: string
    }
    constructor(name, email, cpf, password){
        this.name = name
        this.email = email
        this.cpf = cpf.replace(/(\.)?(\-)?/ig,'')
        this.password = password
    }
}

const mongoose = require('mongoose');
const randomId = () => mongoose.Types.ObjectId();
export class Account{
    id: string
    idUser: string
    private _amount: Number
    

    constructor(idUser: string){
        this.idUser = idUser
        this._amount = 0
    }

    set amount(value: Number) {
        this._amount = value
    }

    get amount() : Number {
        return this._amount
    }
}
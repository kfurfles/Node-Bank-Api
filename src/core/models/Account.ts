export class Account{
    protected idUser = ''
    protected numberAccount = ''
    private amount = 0
    

    constructor(idUser: string, numberAccount: string, amount: number){
        this.idUser = idUser
        this.numberAccount = numberAccount
        this.amount = amount
    }

    setAmount(value: number) {
        this.amount = value
    }

    getAmount() : number {
        return this.amount
    }
}
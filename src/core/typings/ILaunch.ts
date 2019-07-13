export enum Launchtype {
    CREDIT= 'CREDIT',
    DEBIT = 'DEBIT'
}
export interface ILaunchItem {
    name: string,
    type: Launchtype,
    value: number
}

export interface ILaunch {
    id: string
    idUser: String,
    amount: number,
    date: Date,
    launchList: ILaunchItem[]
}


import { LaunchItem } from './LaynchItem';
import { ILaunchItem, ILaunch } from "../typings/ILaunch";

export class Launch implements ILaunch{
    idUser: String
    amount: number
    date: Date
    launchList: ILaunchItem[]

    constructor(idUser: string, amount: number, date: Date){
        this.idUser = idUser
        this.amount = amount
        this.date = date,
        this.launchList = []
    }

    addLaunch(launchItem: ILaunchItem){
        let newLaunchItem = new LaunchItem(launchItem.name, launchItem.type, launchItem.value)
        this.launchList.push(newLaunchItem)
    }
}



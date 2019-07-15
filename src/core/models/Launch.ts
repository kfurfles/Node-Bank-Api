import { LaunchItem } from './LaynchItem';
import { ILaunchItem, ILaunch, Launchtype } from "../typings/ILaunch";
import userDao from './../../modules/User/user.dao';
export class Launch implements ILaunch {
    id: string
    idUser: String
    amount: number = 0
    date: Date
    launchList: ILaunchItem[]

    constructor(idUser: string, amount,date: Date, launchList = []){
        this.idUser = idUser
        this.amount = 0
        this.date = date,
        this.launchList = launchList
    }

    sumAmount(){
        return this.launchList.reduce((acc, cur: ILaunchItem) =>{
            if (Launchtype.CREDIT === cur.type) {
                acc = acc + cur.value
                return acc          
            } else {
                acc = acc - cur.value
                return acc         
            }
        }, this.amount)
    }
    async addLaunch(launchItem: ILaunchItem){
        const user = await userDao.getUserById(this.idUser)
        let newLaunchItem = new LaunchItem(launchItem.name, launchItem.type, launchItem.value)

        if (Launchtype.CREDIT === newLaunchItem.type) {
            user.account.amount += newLaunchItem.value            
        } else {
            user.account.amount -= newLaunchItem.value           
        }
        
        this.launchList.push(newLaunchItem)
        this.amount = user.account.amount
        const { amount, number } = user.account
        await userDao.updateUserDAO(this.idUser, { account: { amount, number } })
    }
}



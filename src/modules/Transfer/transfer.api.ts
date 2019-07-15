import { Launchtype } from '../../core/typings/ILaunch';
import userDao from '../User/user.dao'; 
import { newError } from '../../utils/errors';
import requestValidators from '../../utils/requestValidators';
import launchsDao from '../Launchs/launchs.dao';
import { User } from 'src/core/models/User';

export interface IRequest{
    name: string
    date: Date
    type: Launchtype,
    value: number
}

const create = async (req, res) =>{
    const { id } = req.params
    try {
        const validation = requestValidators(req.body,['destinyAccount','value'])
        const { destinyAccount } = req.body
        let { value : valueToTransfer } = req.body
        valueToTransfer = parseFloat(valueToTransfer.replace(',','.')) 
        const originUser : User = await userDao.getUserById(id)

        if (!originUser) {
            res.status(409).json(newError({ 
                message: 'origin user not found'
            }))
            return;
        }
        const destinyUser : User = await userDao.getUserByAccount(destinyAccount)
        if (!destinyUser) {
            res.status(409).json(newError({ 
                message: 'destiny user not found'
            }))
            return;
        }
        
        if (valueToTransfer > originUser.account.amount) {
            res.status(409).json(newError({ 
                message: 'insufficient funds'
            }))
            return;
        }

        if (valueToTransfer <= 0) {
            res.status(409).json(newError({ 
                message: 'this value is not allowed'
            }))
            return;
        }

        const latestLaunchs = {
            origin: {
                launch: await launchsDao.latestLaunchByUserId(originUser.id),
                launchItem: {}
            },
            destiny: {
                launch: await launchsDao.latestLaunchByUserId(destinyUser.id),
                launchItem: {}
            }
        }

        const newestDate = getIsNewest(latestLaunchs.origin,latestLaunchs.destiny)

        const { origin: {  launchItem: originLaunchItem } } = latestLaunchs
        originLaunchItem['name'] = `SENDED TRANSFER CPF: ${destinyUser.cpf.slice(0,5) + '...'}`
        originLaunchItem['date'] = new Date(newestDate)
        originLaunchItem['type'] = Launchtype.DEBIT
        originLaunchItem['value'] = valueToTransfer
        
        const { destiny: {  launchItem: destinyLaunchItem } } = latestLaunchs
        destinyLaunchItem['name'] = `RECEIVED TRANSFER CPF: ${originUser.cpf.slice(0,5) + '...'}`
        destinyLaunchItem['date'] = new Date(newestDate)
        destinyLaunchItem['type'] = Launchtype.CREDIT
        destinyLaunchItem['value'] = valueToTransfer
        
        const result = await Promise.all([
            launchsDao.upSertLaunch(originUser.id, latestLaunchs.origin.launchItem),
            launchsDao.upSertLaunch(destinyUser.id, latestLaunchs.destiny.launchItem)
        ])

        res.json(result) 

    } catch (error) {
        res.status(500).json(error)
    }
}

function getIsNewest(
        { launch: origin }, 
        { launch: destiny }
    ){
    let originData = origin.date ? new Date(origin.date).getTime() : false
    let destinyData = destiny && destiny['date'] ? new Date(destiny.date).getTime() : false

    if (!destinyData) {
        return origin.date
    }

    return originData > destinyData ? origin.date : destiny.date
}

module.exports = {
    create,
}
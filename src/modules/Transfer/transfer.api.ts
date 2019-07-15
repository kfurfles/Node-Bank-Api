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

        

        if (latestLaunchs.origin.launch) {
            const { origin: { launchItem } } = latestLaunchs
            launchItem['name'] = `TRANSFER CPF: ${destinyUser.cpf.slice(0,5) + '...'}`
            // launchItem['date'] = new Date(launch.date)
            launchItem['type'] = Launchtype.DEBIT
            launchItem['value'] = valueToTransfer
            // launchsDao.updateLaunchUserDAO(originUser.id,0)
        } else {
            const { origin: { launchItem } } = latestLaunchs
            launchItem['name'] = `TRANSFER CPF: ${destinyUser.cpf.slice(0,5) + '...'}`
            // launchItem['date'] = new Date(launch.date)
            launchItem['type'] = Launchtype.DEBIT
            launchItem['value'] = valueToTransfer
        }

        return res.json(latestLaunchs)

    } catch (error) {
        
    }
}

module.exports = {
    create,
}
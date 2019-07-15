import { Launchtype } from '../../core/typings/ILaunch';
import userDao from '../User/user.dao'; 
import { newError } from '../../utils/errors';
import requestValidators from '../../utils/requestValidators';

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
        const { destinyAccount, value : valueToTransfer } = req.body
        
        const originUser = await userDao.getUserById(id)

        if (!originUser) {
            res.status(409).json(newError({ 
                message: 'origin user not found'
            }))
            return;
        }
        const destinyUser = await userDao.getUserByAccount(destinyAccount)
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

        return res.json('')
    } catch (error) {
        
    }
}

module.exports = {
    create,
}
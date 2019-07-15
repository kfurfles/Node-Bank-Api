import { Launchtype } from './../../core/typings/ILaunch';
import launchsDao from './launchs.dao';
import userDao from '../User/user.dao'; 
import { newError, CustomError } from '../../utils/errors';
import requestValidators from '../../utils/requestValidators';

export interface IRequest{
    name: string
    date: Date
    type: Launchtype,
    value: number
}

const create = async (req, res) =>{
    const { id } = req.params
    let launchItems : IRequest[]
    const body = req.body

    const validation = requestValidators(req.body,['name','date','type','value'])
    
    if (!validation.status) {
        res.status(401).json(newError({ message: validation.message }))
        return;
    }
    if(Array.isArray(body)) {
        launchItems = body
    }else {
        launchItems = [body]
    }
    try {
        const requestedLaunchs = launchItems.map((launch: IRequest,i) => async () =>{
            let user : any = await userDao.getUserById(id) 
            if (!user) {
                res.status(404).json(newError({ message: 'user not found' }))
                return;
            }
            launch.value = parseFloat(launch.value.toString().replace(',','.')) 
            let findedlaunch = await launchsDao.findLaunchByDate(id, launch.date)
            
            let result
            if (findedlaunch) {
                result = launchsDao.updateLaunchUserDAO(id, user.account.amount,launch, findedlaunch)
            } else {
                result = await launchsDao.createLaunchUserDAO(id, user.account.amount,launch)
            }

            user = await userDao.getUserById(id)

            req.io.emit(`updated:${id}`, user)
        })
        
        const response = await Promise.all(requestedLaunchs.map(f => f()))
        res.status(200).json(response)

        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    } 

}

const listById = async(req, res) => {
    try {
        const d = new Date();
        const defaultDate = `${d.getMonth()+1}-${d.getDate()}-${d.getFullYear()}`
        const { id } = req.params
        const{ days = 30, startDate = defaultDate } = req.query
        
        if (days < 1) {
            throw  {
                custom: true,
                message: newError({
                    message: 'minimun value to param {days} is 1'
                })
            }
        }
        let findedlaunchs = await launchsDao.findLaunchByDateRange(id, days, new Date(startDate))
        res.status(200).json(findedlaunchs)   
    } catch (error) {
        if (error.hasOwnProperty('custom')) {
            res.status(400).json(error.message)
        }
        else{
            res.status(500).json(error)
        }
    }
}

module.exports = {
    create,
    listById
}
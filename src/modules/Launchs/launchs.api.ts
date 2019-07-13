import { Launchtype } from './../../core/typings/ILaunch';
import launchsDao from './launchs.dao';
import userDao from '../User/user.dao'; 
import { CustomError } from '../../utils/errors';

export interface IRequest{
    name: string
    date: Date
    type: Launchtype,
    value: number
}

const create = async (req, res) =>{
    const { id } = req.params
    let launchItems : IRequest[]
    if(Array.isArray(launchItems)) {
        ({ body: launchItems } = req)
    }else {
        launchItems = [req.body]
    }
    try {
        const requestedLaunchs = launchItems.map((launch: IRequest,i) => async () =>{
            const user : any = await userDao.getUserById(id) 
            launch.value = parseFloat(launch.value.toString().replace(',','.')) 
            let findedlaunch = await launchsDao.findLaunchByDate(id, launch.date)
            if (findedlaunch) {
                const updated = launchsDao.updateLaunchUserDAO(id, user.account.amount,launch, findedlaunch)
                return updated
                //  throw 'No Implemented'
            } else {
                let newlaunch = await launchsDao.createLaunchUserDAO(id, user.account.amount,launch)
                return newlaunch
            }
        })
        
        const response = await Promise.all(requestedLaunchs.map(f => f()))
        console.log(response,'response')
        res.status(200).json(response)

        
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    } 

}

const listById = async(req, res) => {
    try {
        const { id } = req.params
        const{ days = 30 } = req.query
        if (days < 1) {
            const myError = new CustomError();
            myError.code = 400
            myError.message = 'minimun value to this param is 1'
            throw myError
        }
        let findedlaunchs = await launchsDao.findLaunchByDateRange(id, days)
        res.status(200).json(findedlaunchs)   
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(error.code).json({ error: error.message })
        }
        else{
            res.status(500).json({ error: error.message })
        }
    }
}

module.exports = {
    create,
    listById
}
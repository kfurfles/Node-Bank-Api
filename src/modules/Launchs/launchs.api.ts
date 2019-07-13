import { ILaunchItem, Launchtype } from './../../core/typings/ILaunch';
import { ILaunch } from 'src/core/typings/ILaunch';
import userDao from "../User/user.dao";
import launchsDao from './launchs.dao';
import { User } from 'src/core/models/User';

export interface IRequest{
    name: string
    date: Date
    type: Launchtype,
    value: number
}

const create = async (req, res) =>{
    const { id } = req.params
    let launchItem : IRequest 
    ({ body: launchItem } = req)
    try {
        let launch = await launchsDao.findLaunchByDate(id, launchItem.date)

        if (launch) {
            throw Error('Not Implemented')
        } else {
            let newlaunch = await launchsDao.createLaunchUserDAO(id, launchItem)
            res.status(200).json(newlaunch)
        }
        
    } catch (error) {
        res.status(500).json(error)
    } 

}

module.exports = {
    create
}
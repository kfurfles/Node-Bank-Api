export{}
import { Launch } from '../../core/models/Launch';
import { IRequest } from './launchs.api';
import { ILaunch } from 'src/core/typings/ILaunch';
const SchemaLaunch = require('../Launchs/launchs.schema')

const createLaunchUserDAO = async (idUser: string, userAccount, requestLaunchItem : IRequest) =>{
    try {
        const newLaunch = new Launch(idUser, userAccount, requestLaunchItem.date)
        const item = { 
            name: requestLaunchItem.name,
            type: requestLaunchItem.type,
            value: requestLaunchItem.value
        }
        await newLaunch.addLaunch(item)
        
        let createdLaunch = new SchemaLaunch({
            ...newLaunch
        })
    
        return await createdLaunch.save()
    } catch (error) {
        return error
    }
}

const updateLaunchUserDAO = async (idUser: string, userAccount, requestLaunchItem : IRequest, findedLaunch: ILaunch) =>{
    try {
        const newLaunch = new Launch(idUser, userAccount, requestLaunchItem.date, findedLaunch.launchList)
    
        const item = { 
            name: requestLaunchItem.name,
            type: requestLaunchItem.type,
            value: requestLaunchItem.value
        }
    
        await newLaunch.addLaunch(item)
        const { 
            launchList,
            amount
        } = newLaunch
        
        return await SchemaLaunch.findOneAndUpdate({ _id: findedLaunch.id },
                                        {$set: 
                                            {
                                                launchList,
                                                amount
                                            }
                                        }, {new: true},)
        
    } catch (error) {
        return error
    }
}

const findLaunchByDate = async(idUser: string, dateLaunch: Date) => {
    return SchemaLaunch.findOne({ idUser, date: dateLaunch }) 
}

const findLaunchByDateRange = async(idUser: string, nDias: number = 30, initialDate = new Date()) => {
    try {
        initialDate.setHours(0,0,0,0)
        initialDate.setDate(initialDate.getDate()+1)
        var query = { 
            date: { 
                $lt: initialDate.toISOString(),
                $gte: new Date(new Date().setDate(initialDate.getDate()-nDias)).toISOString()
            },
            idUser: idUser 
        }
        return await SchemaLaunch.find(query).sort({date: 'desc'})
    } catch (error) {
        return error
    }
}

const latestLaunchByUserId = async (idUser) =>{
    return await SchemaLaunch.findOne({ idUser: idUser }).sort({date: '-1'})
}

const upSertLaunch = async(idUser, launch) => {
    try {
        launch.value = parseFloat(launch.value.toString().replace(',','.')) 
        let findedlaunch = await findLaunchByDate(idUser, launch.date)

        if (findedlaunch) {
            const updated = await updateLaunchUserDAO(idUser, 0,launch, findedlaunch)
            return updated
        } else {
            let newlaunch = await createLaunchUserDAO(idUser, 0,launch)
            return newlaunch
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

export default {
    createLaunchUserDAO,
    findLaunchByDate,
    findLaunchByDateRange,
    updateLaunchUserDAO,
    latestLaunchByUserId,
    upSertLaunch
}
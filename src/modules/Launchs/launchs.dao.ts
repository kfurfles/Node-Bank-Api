import { Launch } from '../../core/models/Launch';
import { IRequest } from './launchs.api';
const SchemaLaunch = require('./launchs.schema.ts')
export{}

const createLaunchUserDAO = async (idUser: string, requestLaunch : IRequest) =>{
    
    const newLaunch = new Launch(idUser, 0, requestLaunch.date)
    const item = { 
        name: requestLaunch.name,
        type: requestLaunch.type,
        value: requestLaunch.value
    }
    newLaunch.addLaunch(item)
    
    let createdLaunch = new SchemaLaunch({
        ...newLaunch
    })

    return await createdLaunch.save()
}

const findLaunchByDate = async(idUser: string, dateLaunch: Date) => {
    return SchemaLaunch.findOne({ idUser, date: dateLaunch }) 
}

export default {
    createLaunchUserDAO,
    findLaunchByDate
}
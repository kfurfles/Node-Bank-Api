export{}
const User = require('./user.schema')
import { IUser } from 'src/core/typings/IUser'
const encrypt = require('../../utils/encrypt')

const createUserDAO = async (body: IUser) =>{
    const newUser = new User({ 
        ...body,
        password: encrypt.encrypt(body.password)
    })
    return await newUser.save()
}

const listUsersDAO = async () => {
    return await User.find()
}

export default {
    createUserDAO,
    listUsersDAO
}
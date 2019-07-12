export{}
const UserSchema = require('./user.schema')
import { User } from 'src/core/models/User'
const encrypt = require('../../utils/encrypt')

const createUserDAO = async function(body: User) : Promise<User> {
    const newUser = new UserSchema({ 
        ...body,
        idAccount: '',
        password: encrypt.encrypt(body.password)
    })
    return await newUser.save()
}

const updateUserDAO = async function(userId , newData) : Promise<User> {
    let updatedUser = await UserSchema.findOneAndUpdate({ _id: userId },{$set: newData }, {new: true},)
    return updatedUser
}

const listUsersDAO = async () => {
    return await UserSchema.find()
}

export default {
    updateUserDAO,
    createUserDAO,
    listUsersDAO
}
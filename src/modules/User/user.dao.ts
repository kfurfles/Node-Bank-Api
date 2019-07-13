export{}
const UserSchema = require('./user.schema')
import { User } from 'src/core/models/User'
const encrypt = require('../../utils/encrypt')

const createUserDAO = async function(body: User) : Promise<User> {
    const newUser = new UserSchema({ 
        ...body,
        idAccount: '',
        account: {
            amount: 0
        },
        password: encrypt.encrypt(body.password)
    })
    return await newUser.save()
}

const updateUserDAO = async function(userId , newData) : Promise<User> {
    return UserSchema.findOneAndUpdate({ _id: userId },{$set: newData }, {new: true},)
}

const listUsersDAO = async (filters?) => {
    return await UserSchema.find(filters)
}

export default {
    updateUserDAO,
    createUserDAO,
    listUsersDAO
}
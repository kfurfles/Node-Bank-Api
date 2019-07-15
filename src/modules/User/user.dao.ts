export{}
const UserSchema = require('./user.schema')
import { User } from 'src/core/models/User'
const encrypt = require('../../utils/encrypt')
const mongoose = require('mongoose')

const createUserDAO = async function(body: User) : Promise<User> {
    const newUser = new UserSchema({ 
        ...body,
        idAccount: '',
        account: {
            amount: 0,
            number: mongoose.Types.ObjectId()
        },
        password: encrypt.encrypt(body.password)
    })
    return await newUser.save()
}

const updateUserDAO = async function(userId , newData) : Promise<User> {
    return UserSchema.findOneAndUpdate({ _id: userId },{$set: newData }, {new: true},)
}

const listUsersDAO = async function(filters?) {
    return await UserSchema.find(filters)
}

const getUserById = async (id) =>{
    return await UserSchema.findById(id)
}

const getUserByAccount = async (idAccount) =>{
    return await UserSchema.findOne({ 'account.number': idAccount })
}

const getUserByCpf = async (cpfNumber) =>{
    return await UserSchema.findOne({ cpf: cpfNumber })
}

export default {
    updateUserDAO,
    createUserDAO,
    listUsersDAO,
    getUserById,
    getUserByAccount,
    getUserByCpf
}
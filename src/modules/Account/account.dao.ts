export{}
const AccountSchema = require('./account.schema')
import { Account } from './../../core/models/Account'
import { User } from './../../core/models/User';
const mongoose = require('mongoose');
const randomId = () => mongoose.Types.ObjectId();

const createAccountDAO = async (user: User) =>{
    try {    
        const newAccount = new Account(user.id, randomId(), randomId())
        const newAccountSchema = new AccountSchema(newAccount)
        return await newAccountSchema.save()
    } catch (error) {
        return error
    }
}

export default {
   createAccountDAO
}
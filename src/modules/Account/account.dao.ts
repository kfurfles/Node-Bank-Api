export{}
const AccountSchema = require('./account.schema')
import { Account } from './../../core/models/Account'
import { User } from './../../core/models/User';

const createAccountDAO = async function(user: User) : Promise<Account>{
    try {    
        const newAccount = new Account(user.id)
        const newAccountSchema = new AccountSchema(newAccount)
        return await newAccountSchema.save()
    } catch (error) {
        return error
    }
}

export default {
   createAccountDAO
}
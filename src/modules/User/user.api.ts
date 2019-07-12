import userDAO from './user.dao'
import accountDao from './../Account/account.dao'
import { User } from '../../core/models/User'

const create = async (req, res) =>{
    const { body :{
            name,
            email,
            cpf,
            password,
        } 
    } = req
    const newUser = new User(name, email, cpf, password)
    try {
        let createdUser = await userDAO.createUserDAO(newUser)
        const createdAccount = await accountDao.createAccountDAO(createdUser)
        createdUser = await userDAO.updateUserDAO(createdUser.id, {
            idAccount: createdAccount.id
        })
        res.status(200).json(createdUser)
    } catch (error) {
        if (error.errmsg) {
            res.status(400).json(error.errmsg)
            return;   
        }
        res.status(500).json(error.errmsg)   
    }
}

const list = async (req, res) => {
    try {
        const listUsers = await userDAO.listUsersDAO()
        res.status(200).json(listUsers)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    create,
    list
}
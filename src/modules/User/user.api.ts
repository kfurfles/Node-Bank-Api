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
        const createdAccount = await accountDao.createAccountDAO(newUser)
        res.status(200).json({ createdUser, createdAccount })
    } catch (error) {
        res.status(500).json(error)   
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
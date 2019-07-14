import userDAO from './user.dao'
import { User } from '../../core/models/User'
import { newError } from '../../utils/errors';

const create = async (req, res) =>{
    const { 
        body :{
            name,
            email,
            cpf,
            password,
        } 
    } = req
    const newUser = new User(name, email, cpf, password)
    try {
        let createdUser = await userDAO.createUserDAO(newUser)
        res.status(200).json(createdUser)
    } catch (error) {
        if (error.code && error.code === 11000) {            
            res.status(409).json(
                newError({
                    message: 'user already registered'
                })
            )
            return;   
        }
        res.status(500).json(error)   
    }
}

const updateAmountUser = async (userId, newValue) =>{
    const user = userDAO.updateUserDAO(userId, { account: { amount: newValue }})
    return user   
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
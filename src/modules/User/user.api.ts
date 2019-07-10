import userDAO from './user.dao'
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
        const createdUser = await userDAO.createUserDAO(newUser)
        res.status(200).json(createdUser)
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
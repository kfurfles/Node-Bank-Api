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

const list = async (req, res) => {
    try {
        const listUsers = await userDAO.listUsersDAO()
        res.status(200).json(listUsers)
    } catch (error) {
        res.status(500).json(error)
    }
}

const userByCpf = async (req, res) =>{
    try {
        const { cpf } = req.params

        const findedUser = await userDAO.getUserByCpf(cpf)
        if (findedUser) {
            res.status(200).json(findedUser)
            return
        } else {
            res.status(404).json(newError({
                message: 'user not found'
            }))
            return
        }
    } catch (error) {
        res.status(500).json(error)
        return 
    }
}

const getAmuntByUserId = async(req, res) =>{
    try {
        const { id } = req.params
        const findedUser = await userDAO.getUserById(id)
        if (findedUser) {
            const { account: { amount } } = findedUser
            res.status(200).json({ amount })
        } else {
            res.status(404).json(newError({
                message: 'user not found'
            }))
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports = {
    create,
    list,
    userByCpf,
    getAmuntByUserId
}
import { newError } from '../../utils/errors';
const authDAO = require('./auth.dao')
const { decrypt } = require('../../utils/encrypt') 
const { tokenGenerator } = require('../../utils/tokenGenerator')
import requestValidators from '../../utils/requestValidators'
const authUser = async (req, res) =>{
    let { body: { cpf, password } } = req
    
    const errorRespose = () => res.status(401).json(newError({ message: 'Email or Password not correct' }))
    try {
        const validation = requestValidators(req.body,['password','cpf'])

        if(!validation.status){
            res.status(400).json(newError({ message: validation.message }))
            return;
        }

        const user = await authDAO.getUserDao(cpf)
        if (!user) return errorRespose() 
        const checked = await decrypt(password, user.password)
        if (!checked) {
            return errorRespose()
        } else {
            var token = tokenGenerator({ 
                id: user.id,
                email: user.email,
                cpf: user.cpf,
                idAccount:  user.idAccount
            })
            return res.status(200).json({ token })
        }
    } catch (error) {
        return res.status(500).json(error)   
    }
}

module.exports = {
    authUser
}
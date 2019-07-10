export{}
const User = require('../User/user.schema')

const getUserDao = async (cpf) =>{
    return await User.findOne({ cpf: cpf })
}

module.exports = {
    getUserDao
}
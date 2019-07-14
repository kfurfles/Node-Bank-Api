export{}
const User = require('../User/user.schema')

const getUserDao = async (cpf) =>{
    cpf = cpf.replace(/(\.)?(\-)?/ig,'')
    return await User.findOne({ cpf: cpf })
}

module.exports = {
    getUserDao
}
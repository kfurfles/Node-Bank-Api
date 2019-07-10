export{}
const bcrypt = require('bcrypt')
const saltRounds = 10

const encrypt = (pass) => bcrypt.hashSync(pass, saltRounds)

const decrypt = async (pass, hash) => {
    const res = await bcrypt.compare(pass, hash)
    return res
}
module.exports = { encrypt, decrypt }


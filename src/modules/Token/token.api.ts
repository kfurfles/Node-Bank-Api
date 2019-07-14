const { tokenValidator } = require('../../utils/tokenGenerator')

const tokenChecker = async (req, res, next) => {
    let token = req.headers['authorization'];
    try {
        let tokenChecked = await tokenValidator(token);
        req.token = tokenChecked;
        next();
    } catch (err) {
        res.status(401).json(err);
    }
}

module.exports = {
    tokenChecker
}
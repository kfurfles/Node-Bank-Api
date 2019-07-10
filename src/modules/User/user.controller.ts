export{}
const express = require('express');
const routes = express.Router();
const api = require('./user.api')

routes.get('/', api.list)
routes.post('/', api.create)

module.exports = routes
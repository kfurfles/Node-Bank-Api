export{}
const express = require('express');
const routes = express.Router();
const api = require('./user.api')

routes.get('/', api.list)
routes.post('/', api.create)
routes.get('/cpf/:cpf', api.userByCpf )
routes.get('/:id/amount', api.getAmuntByUserId )

module.exports = routes
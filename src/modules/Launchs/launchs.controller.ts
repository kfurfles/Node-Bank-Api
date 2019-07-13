export{}
const express = require('express');
const routes = express.Router();
const api = require('./launchs.api')

routes.post('/:id/launchs', api.create)
routes.get('/:id/launchs', api.listById)

module.exports = routes
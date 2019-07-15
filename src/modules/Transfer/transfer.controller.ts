export{}
const express = require('express');
const routes = express.Router();
const api = require('./transfer.api')

routes.post('/:id/transfer', api.create)

module.exports = routes
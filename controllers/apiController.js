const express = require('express');
const { enigmaReturns, getDetails } = require('../models/enigmaDB');

const apiRouter = express.Router();

apiRouter.get('/', enigmaReturns, (req, res) => {
  res.render('search_return/index', { companies: res.results,
                                        details: res.rows,
                                        user: req.session.user });
});

apiRouter.get('/details', getDetails, (req, res) => {
  res.render('search_return/details', { details: res.rows });
});

module.exports = apiRouter;

const homeRouter = require('express').Router();


homeRouter.get('/', (req, res) => {
  res.render('home/index', { user: req.session.user });
});


module.exports = homeRouter;

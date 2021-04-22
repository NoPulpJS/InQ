const chalk = require('chalk');
const db = require('../data/models');

module.exports = {
  getUserInfo: (req, res, next) => {
    console.log('REQ.USER------', req.user);
    const {
      _id, name, photo_url, email,
    } = req.user;
    res.locals.userInfo = {
      _id,
      name,
      photo: photo_url,
      email,
    };
    return next();
  },

  getCategories: (req, res, next) => {
    const query = { text: 'SELECT category  FROM categories' };
    db.query(query)
      .then((data) => {
        res.locals.categories = data.rows;
        console.log(chalk.red('infocontroler'), res.locals.categories);
        return next();
      })
      .catch((e) => next({
        message: 'error',
        error: e,
      }));
  },
  // postMessageBoard: (req, res, next) => {
  //   console.log(chalk.red('INFOCONTROLLER CONSOLELOG, REQ BODY'), req.body);
  //   const { message } = req.message;
  //   res.locals.messageInfo = {
  //     message,
  //   };
  //   console.log(chalk.red('INFOCONTROLLER CONSOLELOG, RES LOCALS MESSAGEINFO'), res.locals.messageInfo);
  //   return next();
  // },

};

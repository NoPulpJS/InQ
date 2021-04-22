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
    // console.log('res.locals: ', res.locals.userInfo)
    return res.status(200).json(res.locals.userInfo);
  },
  getCategories: (req, res, next) => {
    const query = { text: 'SELECT * FROM categories' };
    db.query(query)
      .then((data) => res.status(200).json(data.rows))
      .catch((e) => {
        next({
          message: `Error with /getCategories route: ${e}`,
          error: e,
        });
      });
  },

  getCompanies: (req, res, next) => {
    const query = {
      text: 'SELECT * FROM companies',
    };

    db.query(query)
      .then((data) => res.status(200).json(data.rows))
      .catch((e) => {
        next({
          message: `Error with /getCompanies route: ${e}`,
          error: e,
        });
      });
  },

};

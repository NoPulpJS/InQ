const db = require('../data/models');

module.exports = {
  getUserInfo: (req, res, next) => {
    // console.log('REQ.USER------', req.user);
    const {
      _id, name, photo_url, email,
    } = req.user;
    res.locals.userInfo = {
      _id,
      name,
      photo: photo_url,
      email,
    };
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

  getQuestions: (req, res, next)=>{
    console.log('indise getQuestions', req.body)
    const {_id }= req.body

    const query = {
        text: 'select * from questions_in_categories where category_id = $1 ',
      values: [_id] 
    };
    db.query(query)
      .then((data) => res.status(200).json(data.rows))
      .catch((e) => {
        next({
          message: `Error with /getQuestion route: ${e}`,
          error: e,
        });
      });
  }

};

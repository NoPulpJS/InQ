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
    return next();
  },

};

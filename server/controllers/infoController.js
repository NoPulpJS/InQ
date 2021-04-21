module.exports = {
  getUserInfo: (req, res, next) => {
    const { displayName, photos, email } = req.user;
    res.locals.userInfo = {
      name: displayName,
      photo: photos[0].value,
      emial: email,
    };
    console.log('res.locals: ', res.locals.userInfo)
    return next();    
  },
  
}
module.exports = {
    checkUserLoggedIn : (req, res, next) => {
    return req.user ? next(): res.sendStatus(401);
  }
};

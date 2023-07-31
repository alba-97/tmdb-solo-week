const { validateToken } = require("../config/tokens");
function validateUser(req, res, next) {
  const token = req.cookies.token;
  if (token) {
    const { payload } = validateToken(token);

    req.user = payload;

    if (payload) return next();
  }
  res.sendStatus(401);
}
module.exports = validateUser;

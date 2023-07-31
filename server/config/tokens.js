const { secret } = require("./config");
const jwt = require("jsonwebtoken");
function generateToken(payload) {
  const token = jwt.sign({ payload }, secret, {
    expiresIn: "2h",
  });

  return token;
}

function validateToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { generateToken, validateToken };

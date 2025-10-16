const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ENV = require("./ENV/environment");
const DB = require("../dbConfig/schema/schema");


// hashing string / password
exports.hashString = (string) => {
  return bcrypt.hashSync(string, parseInt(ENV.SALT_ROUND));
};

// Match user password
exports.checkPassword = (string, hashString) => {
  return bcrypt.compareSync(string, hashString);
};

// generate jwt token
exports.generateAccessToken = (data, expire_at = "365d") => {
  return jwt.sign(data, ENV.TOKEN_SECRET, { expiresIn: expire_at });
};

// verify access token
exports.verifyAccessToken = async (token) => {
  return jwt.verify(token, ENV.TOKEN_SECRET, (err, decode) => {
    if (err) return 401;
    else return decode;
  });
};

// generate random string
exports.generateRandomString = (length) => {
  const characters = ENV.TOKEN_SECRET;
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

// make title case
exports.toTitleCase = (str) => {
  return str?.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
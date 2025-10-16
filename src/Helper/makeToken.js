const DB = require("../dbConfig/schema/schema");
const { generateAccessToken} = require("./helper");

exports.makeToken = async (user, expire_at = "365d", is_login = false) => {

  let userObject = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    createdAt: user?.createdAt ?? null

  };

  if (is_login) {
    const tokenObject = { id: user.id, email: user.email };

    const token = generateAccessToken(tokenObject, expire_at);
    user.auth_token = token;
    await user.save()
    return { token, userObject };
  }

  return { userObject };
};
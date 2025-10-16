const { verifyAccessToken } = require("../Helper/helper");
const DB = require("../dbConfig/schema/schema");

exports.validateToken = () => {
  return async function (req, res, next) {
    try {
      const tokenWithQuotes = req.headers["authorization"].split(" ")[1];
      const token = tokenWithQuotes.replace(/['"]+/g, "");
      const decode = await verifyAccessToken(token);
      if (decode == 401) return res.errorResponse(true, "Session Expires", 401);

      const userObject = await DB.User.findById(decode.id);
      if (!userObject) return res.errorResponse(true, "Invalid User", 401);

      const matchToken = await DB.User.findOne({
        _id: decode.id,
        auth_token: token,
      });
      if (!matchToken)
        return res.errorResponse(true, "Invalid Access Token", 401);
      req.user = userObject;
      next();
    } catch (err) {
      return res.errorResponse(true, "Invalid Request!", 401);
    }
  };
};

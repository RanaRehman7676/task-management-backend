
const ENV = require("../../Helper/ENV/environment");
const { makeToken } = require("../../Helper/makeToken");
const {
  hashString,
  checkPassword,
} = require("../../Helper/helper");
const DB = require("../../dbConfig/schema/schema");

const AuthController = {
  // new signup
  async signUp(req, res) {
    try {
      const { body } = req;
      const {
        name = null,
        email,
        password,
        retype_password,
      } = body;

      // find user by email
      const user = await DB.User.findOne({ email });
      if (user)
        return res.errorResponse(
          true,
          "User with the same email already exists",
          400
        );

      // check again if password does not match with the retype password attribute
      if (password != retype_password)
        return res.errorResponse(true, "Passwords must match", 400);

      let userObject = {
        name,
        email,
        password: hashString(password),
      };

      const createUser = await DB.User.create(userObject);
      if (!createUser)
        return res.errorResponse(true, "Error while creating user.", 400);

      // update user
      await createUser.save();

      return res.successResponse(true, { success: true }, "Sign Up Success");
    } catch (error) {
      console.log("signUp: ", error);
      return res.errorResponse(true, error.message);
    }
  },
  // login - integrated done!
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // find user
      const user = await DB.User.findOne({
        email
      });
      if (!user)
        return res.errorResponse(true, "User Not Exist", 400);

      // match user password
      const isMatch = checkPassword(password, user.password);
      if (!isMatch) return res.errorResponse(true, "Invalid Credientials", 400);

      // make authenticated token
      const expireAt = ENV.SESSION_OUT_AFTER;
      const isLogin = true;
      const { token, userObject } = await makeToken(user, expireAt, isLogin);

      // update user token
      user.auth_token = token;
      await user.save();

      return res.successResponse(true, { token, userObject }, "Login Success");
    } catch (error) {
      console.log("login: ", error);
      return res.errorResponse(true, error.message);
    }
  },

  // me api
  // update token
  async token(req, res, next) {
    try {
      const { user } = req;

      const { token, userObject } = await makeToken(user);

      return res.successResponse(false, { token, userObject }, "token");
    } catch (error) {
      console.log("token: ", error);
      return res.errorResponse(true, error.message);
    }
  },
};

module.exports = AuthController;
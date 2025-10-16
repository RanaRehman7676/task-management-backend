const express = require("express");
const { AuthController } = require("../../../controller");
const validateRequest = require("../../../middleware/validateRequest");
const {
  signUpSchema,
  loginSchema,
} = require("../../../validation/authSchema");
const { validateToken } = require("../../../middleware/validateToken");

const router = express.Router();

// SignUp User
router.post("/sign-up", validateRequest(signUpSchema), AuthController.signUp);

// Login User
router.post("/login", validateRequest(loginSchema), AuthController.login);

// me api
router.get("/me", validateToken(), AuthController.token);



module.exports = router;

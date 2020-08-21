/**
 * auth.routes.js
 *
 * @module      :: Routes
 * @description :: Users routes and action
 * @author      ::
 */

const router = require("express").Router();

// Middlewares
const { isAuth } = require("../middleware/auth");

//Controller functionality
const {
  authInfoController,
  logoutController,
  loginController
} = require("../controllers/auth.controllers");

/**
 * @route  POST api/users/login
 * @desc   Send user info to server && check it valid or not.
 * @access Public
 */
router.post('/login', loginController);

/**
 * @route  GET /api/v1/auth/user-info
 * @desc
 * @access private
 */
router.get("/user-info", isAuth, authInfoController);

/**
 * @route  GET api/users/logout
 * @desc   
 * @access private
 */
router.get("/logout", isAuth, logoutController);

module.exports = router;

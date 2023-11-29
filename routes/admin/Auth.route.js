const express = require('express');
const csrf = require("csurf");
const bodyParser = require('body-parser');
// const multipartForm = require('../../middlewares/MultipartForm.js');
const authController = require('../../controllers/Login.controller.js');

const router = express.Router();

const csrfProtection = csrf({
    cookie: {
        secure: "auto",
        httpOnly: true,
        sameSite: "Lax",
    },
});
const urlEncodedParser = bodyParser.urlencoded({
    extended: false,
});

router.get('/', csrfProtection, authController.rootPage);
router.get('/login', csrfProtection, authController.loginPage);
router.get('/doLogin', setToLogin);
router.post('/doLogin', csrfProtection, urlEncodedParser, authController.doLogin);
function setToLogin(req, res) {
    res.redirect("login");
}

module.exports = router;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userServ = require('../services/User.service.js');
const message = require('../helpers/Messages.json');
const { db } = require('../configs/Database.js');
const AuditLog = require('../models/AuditLog.model.js');

const title = "Login | Metroland";

async function rootPage(req, res) {

  res.render("auth/login", {
    title: title,
    csrfToken: req.csrfToken(),
  });
};

async function loginPage(req, res) {
  res.render("auth/login", {
    title: title,
    csrfToken: req.csrfToken(),
  });
};

async function doLogin(req, res) {
  const reqBody = req.body;

  try {
    const pwd = process.env.SIGNATURE;

    const emailDecrypt = await userServ.doDecrypt(reqBody.e);
    const passDecrypt = await userServ.doDecrypt(reqBody.p);
    if (emailDecrypt == "" && passDecrypt == "") {
      throw new Error(message["551"]);
    }

    let data = {};
    data.email = emailDecrypt;
    data.password = passDecrypt;
    console.log("--> " + JSON.stringify(data))

    const isSchemaErr = await userServ.checkLoginSchema(data);
    if (isSchemaErr.isError) {
      throw new Error(isSchemaErr.message);
    }
    const user = await userServ.getByEmail(emailDecrypt);
    console.log("user : " + JSON.stringify(user))
    if (user && bcrypt.compareSync(passDecrypt, user.password)) {

      const emailSignIn = user.email;
      const nameSignIn = user.name;
      const fullnameSignIn = user.fullname;
      const idSignIn = user.id;

      const accessToken = jwt.sign(
        { emailSignIn, nameSignIn, idSignIn, fullnameSignIn },
        pwd, { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { idSignIn },
        pwd, { expiresIn: "1d" }
      );

      console.log("ref : " + refreshToken)
      user.refresh_token = refreshToken;
      user.save();

      await db.AuditLog.create({
        created_by: user.fullname,
        event: "login",
        description: "user " + user.name + " berhasil login",
        created_at: new Date(),
        updated_at: new Date()
      });
      res.cookie('metroAdmAcc', accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000
      });
      res.cookie('metroAdmRef', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.redirect("/metroland/auth/homes");

    } else {

      throw new Error(message["500"]);
    }
  } catch (error) {
    console.error(error);
    res.render("auth/login", {
      code: 404,
      msg: error,
      title: title,
      csrfToken: req.csrfToken(),
    });
  }
};

module.exports = { rootPage, loginPage, doLogin }

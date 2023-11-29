const jwt = require('jsonwebtoken');

function isLogin(req, res, next) {
    const token = req.cookies.metroAdmAcc;
    // const refreshToken = req.cookies.smartQ_Acc;
    if (token == "undefined" || token == null) {
        return res.redirect("/metroland");
    } else {
        const bearer = jwt.verify(token, process.env.SIGNATURE);

        req.bearer = bearer;
        next();
    }
}
module.exports = isLogin

const TITLE = 'Metroland | Login';

async function rootAuth(req, res) {

    res.render("auth/login", {
        title: TITLE,
        csrfToken: req.csrfToken()
    })
}

module.exports = { rootAuth };

const title = "Metroland | Home";
const header = "Dashboard";
const INTERNAL_SERVER_ERROR = 500;

async function homePage(req, res) {
    try {
        // const reqBody = req.body;
        // const menus = req.myMenu;
        // console.log("menussss : " + JSON.stringify(menus));
        res.render("homes/index", {
            title,
            header,
        })
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).render("500/index");
    }
}

module.exports = { homePage }
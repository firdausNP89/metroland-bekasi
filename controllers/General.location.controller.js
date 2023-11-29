
const jsdom = require('jsdom');
const { db } = require('../configs/Database.js');

const { JSDOM } = jsdom;
const INTERNAL_SERVER_ERROR = 500;
async function locationPage(req, res) {

    try {


        res.render("f_location/index");
    } catch (error) {
        console.error(error);
        return res.status(INTERNAL_SERVER_ERROR).render("500/index");
    }
}



module.exports = { locationPage }
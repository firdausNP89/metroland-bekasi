const productServ = require('../services/Product.service.js');
const newsService = require('../services/News.service.js');
const jsdom = require('jsdom');
const moment = require('moment');
const title = "Metroland | Cluster";
const header = "Cluster";
const INTERNAL_SERVER_ERROR = 500;

const { JSDOM } = jsdom;

async function berandaPage(req, res) {

    try {

        const products = await productServ.getAllProductByLimit(4);
        const news = await newsService.getAllNewsByLimit(3);
        console.log(JSON.stringify(news))

        res.render("f_beranda/index", { products, news, JSDOM, moment });
    } catch (error) {
        console.error(`err clusterPage : ${error}`)
        return res.status(INTERNAL_SERVER_ERROR).render("500/index");
    }
}

module.exports = { berandaPage }
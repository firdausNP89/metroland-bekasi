const productServ = require('../services/Product.service.js');
const moment = require('moment');
const { Op } = require("sequelize");
const jsdom = require('jsdom');
const title = "Metroland | Home";
const header = "Product";
const INTERNAL_SERVER_ERROR = 500;

const { JSDOM } = jsdom;

async function productPage(req, res) {
    const page = req.query.page || 1;
    const size = req.query.size || 10;
    const key = req.query.q || null;

    try {
        console.log("key : " + key)
        let where = {};
        if (key != null) {
            where.title = { [Op.substring]: key }
        }
        const { count, rows } = await productServ.getAllProduct(where, page, size)
        console.log("--> " + JSON.stringify(rows))

        res.render("products/index", {
            title, header, products: rows, moment, csrfToken: req.csrfToken(), JSDOM
        });
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).render("500/index");
    }
}

module.exports = { productPage }
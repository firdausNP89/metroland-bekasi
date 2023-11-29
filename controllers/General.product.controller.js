const productService = require('../services/Product.service.js');
const moment = require('moment');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const INTERNAL_SERVER_ERROR = 500;

async function productPage(req, res) {
    const productId = req.params.id
    console.log(productId);
    try {
        const data = await productService.getProductCluster(productId);
        if (!data) {
            throw new Error('data not found');
        }
        console.log(JSON.stringify(data))

        res.render("f_product/index", { data, moment, JSDOM });
    } catch (error) {
        console.error(error);
        return res.status(INTERNAL_SERVER_ERROR).render("500/index");
    }
}



module.exports = { productPage }
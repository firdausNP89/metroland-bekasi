
const jsdom = require('jsdom');
const { Op } = require('sequelize');
const carrierService = require('../services/Carrier.service.js');
const { JSDOM } = jsdom;
const INTERNAL_SERVER_ERROR = 500;
async function carrierPage(req, res) {

    const page = req.query.page;
    try {
        const page_ = typeof page === 'undefined' ? 1 : page;
        const size_ = 6;

        let where = {};
        where.expired = { [Op.gte]: new Date() }

        const { count, rows } = await carrierService.getAllCarrier(where, page_, size_);
        console.log(JSON.stringify(rows))

        res.render("f_carrier/index", { rows: rows ? rows : [] });
    } catch (error) {
        console.error(error);
        return res.status(INTERNAL_SERVER_ERROR).render("500/index");
    }
}



module.exports = { carrierPage }
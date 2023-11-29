const { db } = require('../configs/Database.js');
const { Op } = require('sequelize');
const util = require('../helpers/Util.js');
const path = require('path');
const newsService = require('../services/News.service.js');
// const { ckEditor } = require('@ckeditor/ckeditor5-image');
const pagination = require('../helpers/Pagination.js');
const jsdom = require('jsdom');
const moment = require('moment');

const title = "Metroland | Home";
const header = "Berita & Peristiwa";
const INTERNAL_SERVER_ERROR = 500;
const { JSDOM } = jsdom;

// const image = ckEditor.Image;

async function newsPage(req, res) {
    console.info(`inside newsPage`);
    const page = req.query.page;
    const size = req.query.size;
    const q = req.query.q;
    console.log(page + " | " + size);
    try {
        const page_ = typeof page === 'undefined' ? 1 : page;
        const size_ = typeof size === 'undefined' ? 10 : size;
        console.log(page_ + " | " + size_)

        let where = {};
        if (typeof q !== 'undefined') {
            where.title = { [Op.like]: '%' + q + '%' }
        }

        const { count, rows } = await newsService.getAllNews(where, page_, size_)
        let { number, pageNumUi } = pagination.setPagination(rows, count, page_, size_, null, "/metroland/auth/news");
        res.render("news/index", {
            title, header, csrfToken: req.csrfToken(), pagination: pageNumUi, rows, JSDOM, moment
        })
    } catch (error) {
        console.error(error);
        return res.status(INTERNAL_SERVER_ERROR).render("500/index");
    }
}

async function upload(req, res) {
    try {
        const filename = req.files.upload.names;
        console.log("filename : " + filename)
        res.status(200).send('ok')
    } catch (error) {
        console.error(error);
        res.status(400).send('error')
    }
}

async function save(req, res) {
    const reqBody = req.body;
    const bearer = req.bearer;
    console.info("add news : " + JSON.stringify(bearer));
    try {

        const thubnail = req.file;

        const date = new Date();
        let data = {};
        data.title = reqBody.title;
        data.description = reqBody.description.replaceAll('<img', '<img class="img-fluid rounded mx-auto d-block"');
        if (typeof thubnail !== 'undefined') {
            data.image_thubnail = thubnail.originalname;
        }
        data.created_by = bearer.emailSignIn;
        data.updated_by = bearer.emailSignIn;
        data.created_at = date;
        data.updated_at = date;

        await db.News.create(data);

        res.redirect('news')
    } catch (error) {
        console.error(error);
        res.redirect('news')
    }
}

async function edit(req, res) {
    const reqBody = req.body;
    const bearer = req.bearer;
    console.info("add news : " + JSON.stringify(reqBody));
    try {
        const id = reqBody.news_id;
        const thubnail = req.file;

        const date = new Date();
        let data = {};
        data.title = reqBody.title;
        data.description = reqBody.description.replaceAll('<img', '<img class="img-fluid rounded mx-auto d-block"');
        if (typeof thubnail !== 'undefined') {
            data.image_thubnail = thubnail.originalname;
        }
        data.updated_by = bearer.emailSignIn;
        data.updated_at = date;

        await db.News.update(data, { where: { id } });

        res.redirect('/metroland/auth/news')
    } catch (error) {
        console.error(error);
        res.redirect('/metroland/auth/news')
    }
}

module.exports = { newsPage, upload, save, edit }
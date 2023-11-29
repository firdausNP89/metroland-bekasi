const { db } = require('../configs/Database.js');

async function getDetail(where) {
    return await db.News.findOne({ where });
}

async function getAllNews(where, page, per_page) {
    return await db.News.findAndCountAll({
        where,
        order: [["id", "DESC"]],
        offset: (page - 1) * per_page,
        limit: per_page,
        distinct: true,
    });
}

async function getAllNewsByLimit(limit) {
    return await db.News.findAll({ limit });
}

async function getNewsList(where, page, limit) {

    return await db.News.findAndCountAll({
        where,
        order: [["id", "DESC"]],
        offset: (page - 1) * limit,
        limit: limit,
        distinct: true,
    });
};


module.exports = { getAllNews, getAllNewsByLimit, getDetail, getNewsList }

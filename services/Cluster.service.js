const { db } = require('../configs/Database.js');

async function getAllClusterByLimit(limit) {
    return await db.Cluster.findAll({ limit });
}

async function getClusterById(id) {
    return await db.Cluster.findOne({
        where: {
            id: id
        }
    });
}

async function getClusters() {
    return await db.Cluster.findAll({
        attributes: ['id', 'name']
    });
}

async function getAllCluster(where, page, per_page) {
    return await db.Cluster.findAndCountAll({
        where,
        order: [["id", "DESC"]],
        offset: (page - 1) * 10,
        limit: per_page,
        distinct: true,
    });
}
async function doEdit(id, data) {
    return await db.Cluster.update(data, { where: { id }, returning: true });
}


module.exports = { getAllClusterByLimit, getClusterById, getClusters, getAllCluster, doEdit }

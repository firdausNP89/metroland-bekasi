const { db } = require('../configs/Database.js');

async function createStatus(data, transaction) {

    if (transaction == null) {
        return await db.Status.create(data, {
            returning: true,
            plain: true
        });
    } else {
        return await db.Status.create(data, {
            returning: true,
            plain: true,
            transaction
        });
    }
}


module.exports = { createStatus }

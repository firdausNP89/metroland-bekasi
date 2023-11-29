const { db } = require('./configs/Database.js');
const statusService = require('./services/Status.service.js');

async function main() {

    console.info(`start init`);

    const statusList = ['Active', 'Block', 'Resign'];
    try {
        (async () => {
            await db.conn.sync({
                force: true
            });
        })();

        let data = {}
        data.name = statusList[0];
        data.created_by = 'system'
        await db.Status.create(data);
    } catch (error) {
        console.error(error)
    }
    console.info(`finish init`);

}

// main();
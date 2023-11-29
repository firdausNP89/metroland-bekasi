const response = require('../helpers/Response.js');
const config = require('../services/Config.service.js');

async function getPromo(req, res) {
    console.info(`inside getPromo`);

    try {

        const dataConfig = await config.getPromo();

        const cfg = dataConfig.value;

        const start = new Date(cfg.start);
        start.setDate(start.getDate() + cfg.duration);

        if (start < new Date()) {
            throw new Error('tidak ada promosi');
        }

        await response(res, 200, 200, 'success', dataConfig.value);

    } catch (error) {
        console.error(`err doEditProduct : ${error}`);
        await response(res, 200, 400, error.message)
    }
}



module.exports = { getPromo }
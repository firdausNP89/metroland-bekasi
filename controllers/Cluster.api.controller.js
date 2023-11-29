const response = require('../helpers/Response.js');
const clusterService = require('../services/Cluster.service.js');

async function doEditCluster(req, res) {
    console.info(`inside doEditProduct`);
    const clusterId = req.params.id;
    let reqBody = req.body;
    console.log(`id : ${clusterId} , body : ${JSON.stringify(reqBody)}`)
    try {

        const data = await clusterService.doEdit(clusterId, reqBody);

        reqBody.id = clusterId;


        await response(res, 200, 200, 'success', reqBody);

    } catch (error) {
        console.error(`err doEditProduct : ${error}`);
        await response(res, 200, 400, error)
    }
}

async function getAllCluster(req, res) {

    try {

        const clusters = await clusterService.getClusters();

        res.status(200).send({ code: 200, message: 'success', data: clusters })

    } catch (error) {
        console.error(`err getAllCluster : ${error}`)
        res.status(500).send({ code: 500, message: error.message })
    }
};

module.exports = { doEditCluster, getAllCluster }
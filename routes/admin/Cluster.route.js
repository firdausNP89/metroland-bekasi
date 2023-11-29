const express = require('express');
const clusterController = require('../../controllers/Cluster.controller.js');
const clusterApi = require('../../controllers/Cluster.api.controller.js');
const router = express.Router();
const csrf = require('csurf');
const csrfProt = csrf({
    cookie: true,
});

router.get('/clusters', csrfProt, clusterController.clusterPage);



//------------------- PRODUCT API --------------------
router.put('/clusters/:id', csrfProt, clusterApi.doEditCluster);
router.get('/api/v1/clusters', csrfProt, clusterApi.getAllCluster);


module.exports = router;
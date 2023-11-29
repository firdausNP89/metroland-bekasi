const response = require('../helpers/Response.js');
const productService = require('../services/Product.service.js');
const clusterService = require('../services/Cluster.service.js');
const fs = require('fs');

async function doEditProduct(req, res) {
    console.info(`inside doEditProduct`);
    const productId = req.params.id;
    const reqBody = req.body;
    console.log(`id : ${productId} , body : ${JSON.stringify(reqBody)}`)
    try {

        await productService.doEdit(productId, reqBody);

        await response(res, 200, 200);

    } catch (error) {
        console.error(`err doEditProduct : ${error}`);
        await response(res, 200, 400, error)
    }
}

async function doAddProduct(req, res) {
    console.info(`inside doAddProduct`);
    const reqBody = req.body;
    const bearer = req.bearer;

    // const t = await db.conn.transaction();
    try {
        const date = new Date();
        const logo = req.files[0];

        let data = {};
        if (req.files.length > 0) {
            data.image = logo.originalname;

            fs.writeFile('./public/metroland/assets/img/' + logo.originalname, logo.buffer, function (err) {
                if (err) {
                    throw new Error(err);
                }
            });
        }
        data.title = reqBody.title
        data.content = reqBody.description;
        data.created_by = bearer.emailSignIn;
        data.updated_by = bearer.emailSignIn;
        data.created_at = date;
        data.updated_at = date;

        // console.log(JSON.stringify(reqBody))
        const newProduct = await productService.addProduct(data, null);
        console.log("new product : " + JSON.stringify(newProduct))

        const clusters_ = reqBody.clusters.split(',');
        await Promise.all(clusters_.map(async (element) => {
            console.log("element : " + element)

            // await clusterService.getClusterById(element).then(async (cluster) => {
            //     console.log("----> " + cluster.id)
            //     await cluster.addProducts(newProduct.id)
            // })
            const c = await clusterService.getClusterById(element);
            await c.addProducts(newProduct.id);
        }))


        // await t.commit()
        await response(res, 200, 200);

    } catch (error) {
        console.error(`err doEditProduct : ${error}`);
        // await t.rollback();
        await response(res, 500, 400, error)
    }
}

module.exports = { doEditProduct, doAddProduct }
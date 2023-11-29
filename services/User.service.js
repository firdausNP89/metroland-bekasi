const { db } = require('../configs/Database.js');
const CryptoJS = require('crypto-js');
const joi = require('joi');

async function checkLoginSchema(data) {

    let schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    });
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(data, options);

    if (error) {
        let response = {};
        response.isError = true;
        response.message = error.details.map((x) => x.message).join(", ");
        return response;
    } else {
        let response = {};
        response.isError = false;
        response.message = "";
        return response;
    }
}

async function getByEmail(email) {
    const response = await db.User.findOne({
        where: {
            email: email,
        }
    });
    return response;
};

async function doDecrypt(value) {
    const key = process.env.SIGNATURE;
    var bytes = CryptoJS.AES.decrypt(value, key);
    return bytes.toString(CryptoJS.enc.Utf8);

}

module.exports = { checkLoginSchema, getByEmail, doDecrypt }
async function setResponse(res, status, code, message, data) {

    let result = {};
    result.code = code;
    result.success = code == 200 ? true : false;
    result.message = code == 200 ? 'success' : message;
    if (code == 200) {
        result.data = data;
    }

    return await res.status(status).send(result);
}

module.exports = setResponse
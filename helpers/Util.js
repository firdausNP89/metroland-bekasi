async function getReqFile(req, fieldname) {
    var index = req.files.findIndex(function (file) {
        return file.fieldname == fieldname;
    });
    return req.files[index];
}
async function isNumber(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
};

module.exports = { getReqFile, isNumber }
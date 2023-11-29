const Busboy = require("busboy");
const os = require("os");
const fs = require("fs");
const path = require("path");
const randomstring = require("randomstring");

function multipartForm(req, res, next) {
  const busboy = Busboy({
    headers: req.headers,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB
    },
  });

  const fields = {};
  const files = [];
  const fileWrites = [];
  const tmpdir = os.tmpdir();

  busboy.on("field", (fieldname, value) => {
    fields[fieldname] = value;
  });

  busboy.on("file", (fieldname, file, { filename }, encoding, mimetype) => {
    const firstName = randomstring.generate(5) + "_" + filename;
    const filepath = path.join(tmpdir, firstName);
    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);

    const promise = new Promise((resolve, reject) => {
      file.on("end", () => writeStream.end());
      writeStream.on("finish", () => {
        fs.readFile(filepath, (err, buffer) => {
          const size = Buffer.byteLength(buffer);
          if (err) {
            return reject(err);
          }

          files.push({
            fieldname,
            originalname: filename,
            encoding,
            mimetype,
            buffer,
            size,
          });

          try {
            fs.unlinkSync(filepath);
          } catch (error) {
            return reject(error);
          }

          resolve();
        });
      });
      writeStream.on("error", reject);
    });
    fileWrites.push(promise);
  });

  busboy.on("finish", () => {
    Promise.all(fileWrites)
      .then(() => {
        req.body = fields;
        req.files = files;
        next();
      })
      .catch(next);
  });

  if (req.rawBody) {
    busboy.end(req.rawBody);
  } else {
    req.pipe(busboy);
  }
};

module.exports = multipartForm

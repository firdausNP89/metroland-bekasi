const dotEnv = require('dotenv');
dotEnv.config();
const {
    Sequelize
} = require('sequelize');
const db = {};

const host = process.env.SQLDB_HOST;
const port = process.env.SQLDB_PORT;
const database = process.env.SQLDB_DATABASE;
const user = process.env.SQLDB_USERNAME;
const password = process.env.SQLDB_PASSWORD;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: 'mysql',
    logging: false
});

initialize();

async function initialize() {

    db.conn = sequelize;
    db.Access = require('../models/Access.model.js')(sequelize);
    db.Carrier = require('../models/Carrier.model.js')(sequelize);
    db.Cluster = require('../models/Cluster.model.js')(sequelize);
    db.ClusterImage = require('../models/ClusterImage.model.js')(sequelize);
    db.Config = require('../models/Config.model.js')(sequelize);
    db.Contact = require('../models/Contact.model.js')(sequelize);
    db.Customer = require('../models/Customer.model.js')(sequelize);
    db.Department = require('../models/Department.model.js')(sequelize);
    db.Facility = require('../models/Facility.model.js')(sequelize);
    db.News = require('../models/News.model.js')(sequelize);
    db.Product = require('../models/Product.model.js')(sequelize);
    db.Status = require('../models/Status.model.js')(sequelize);
    db.User = require('../models/User.model.js')(sequelize);
    db.AuditLog = require('../models/AuditLog.model.js')(sequelize);
    db.AboutUs = require('../models/AboutUs.model.js')(sequelize);

    db.Department.hasMany(db.Carrier, {
        foreignKey: 'departmentId',
    });
    db.Carrier.belongsTo(db.Department);


    db.Status.hasMany(db.User, {
        foreignKey: 'status_id'
    });
    db.User.belongsTo(db.Status, {
        foreignKey: 'status_id',
        sourceKey: 'status_id'
    });

    db.Product.belongsToMany(db.Cluster, { through: 'products_clusters' });
    db.Cluster.belongsToMany(db.Product, { through: 'products_clusters' });

    db.Facility.belongsToMany(db.Cluster, { through: 'clusters_facilities' });
    db.Cluster.belongsToMany(db.Facility, { through: 'clusters_facilities' });

    db.Cluster.hasMany(db.ClusterImage, {
        foreignKey: 'clusterId',
    });
    db.ClusterImage.belongsTo(db.Cluster);
}

module.exports = { db, sequelize };

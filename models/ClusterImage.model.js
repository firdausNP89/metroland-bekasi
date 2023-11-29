const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const cluster = {
        clusterId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING,
            allowNull: false
        },
        updated_by: {
            type: DataTypes.STRING,
            allowNull: true
        },
        deleted_by: {
            type: DataTypes.STRING,
            allowNull: true
        }
    };

    const options = {
        tableName: "cluster_images",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
        defaultScope: {
            attributes: {}
        }
    };

    return sequelize.define('ClusterImages', cluster, options);
}
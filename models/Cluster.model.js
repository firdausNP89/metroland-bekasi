const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const cluster = {
        // product_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        total_badroom: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        total_bathroom: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        total_garage: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        area: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        building_area: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        image_site_plan: {
            type: DataTypes.STRING,
            allowNull: true
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        longitude: {
            type: DataTypes.DOUBLE,
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
        tableName: "clusters",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
        defaultScope: {
            attributes: {}
        }
    };

    return sequelize.define('clusters', cluster, options);
}
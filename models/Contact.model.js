const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const contact = {
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
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
        tableName: "contacts",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
        defaultScope: {
            attributes: {}
        }
    };

    return sequelize.define('contacts', contact, options);
}
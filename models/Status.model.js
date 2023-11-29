const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const status = {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_by: {
            type: DataTypes.STRING,
            allowNull: true
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
        tableName: "status",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
        defaultScope: {
            attributes: {}
        }
    };

    return sequelize.define('status', status, options);
}
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const product = {
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image: {
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
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
        defaultScope: {
            attributes: {}
        }
    };

    return sequelize.define('products', product, options);
}
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const news = {
        title: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image_thubnail: {
            type: DataTypes.STRING,
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
        tableName: "news",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
        defaultScope: {
            attributes: {}
        }
    };

    return sequelize.define('news', news, options);
}
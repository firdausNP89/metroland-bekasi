const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const carrier = {
        expired: {
            type: DataTypes.DATE,
            allowNull: true
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        banner_image: {
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
        tableName: "carriers",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
        defaultScope: {
            attributes: {}
        }
    };

    return sequelize.define('carriers', carrier, options);
}
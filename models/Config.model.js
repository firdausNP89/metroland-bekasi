const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const config = {
        code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type_of_value: {
            type: DataTypes.STRING,
            allowNull: true
        },
        value: {
            type: DataTypes.JSON,
            allowNull: true
        },
        description: {
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
        tableName: "config",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
        defaultScope: {
            attributes: {}
        }
    };

    return sequelize.define('config', config, options);
}
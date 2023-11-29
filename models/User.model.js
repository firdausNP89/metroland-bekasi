const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const user = {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 31
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            isMail: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
            max: 255
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        access_token: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        join_date: {
            type: DataTypes.DATE,
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
        tableName: "users",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true,
        defaultScope: {
            attributes: {}
        }
    };

    return sequelize.define('users', user, options);
}
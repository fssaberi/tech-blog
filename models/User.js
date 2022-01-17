const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


// create User model
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

// columns for User
User.init(
    {
        // id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // at least 8 characters
                len: [8]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUserInfo) {
                newUserInfo.password = await bcrypt.hash(newUserInfo.password, 10);
                return newUserInfo;
            },
            async beforeUpdate(updatedUserInfo) {
                updatedUserInfo.password = await bcrypt.hash(updatedUserInfo.password, 10);
                return updatedUserInfo;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User; 
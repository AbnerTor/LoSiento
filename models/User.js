// User.js
// id, username, email, password, bcrypt hooks

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

// for hashing passwords
const bcrypt = require('bcrypt');

class User extends Model {
    // checkPassword method to compare hashed password in DB with user input
    checkPassword(loginPass) {
      return bcrypt.compareSync(loginPass, this.password);
    }
}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { 
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            }
        }
    },
    {
        hooks: {
          beforeCreate: async (newUser) => {
            newUser.password = await bcrypt.hash(newUser.password, 10);
            return newUser;
          },
          beforeUpdate: async (updatedUser) => {
            updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
            return updatedUser;
          },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
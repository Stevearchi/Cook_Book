module.exports = function (sequelize, DataTypes) {
    var Member = sequelize.define('Member', {
        
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false,
            validate: {
                notIn: [" "]
            }
        },
        lastname: {
            type: DataTypes.STRING,
            notEmpty: true,
            allowNull: false,
            validate: {
                notIn: [" "]
            }
        },
        username: {
            type: DataTypes.TEXT,
            notEmpty: true
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },
        last_login: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            dafaultValue: 'active'
        }
    });
    return Member;
}
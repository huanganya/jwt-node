module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define("profile", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        firstname: {
            type: Sequelize.STRING,
            allowNull: false
        },

        lastname: {
            type: Sequelize.STRING,
            allowNull: false
        },

        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },

        country: {
            type: Sequelize.STRING,
            allowNull: false
        },

        city: {
            type: Sequelize.STRING,
            allowNull: false
        },

        zipcode: {
            type: Sequelize.STRING,
            allowNull: false
        },

        state: {
            type: Sequelize.STRING,
            allowNull: false
        },

        address: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,

            // If don't want createdAt
            createdAt: false,

            // If don't want updatedAt
            updatedAt: false,
    });

    return Profile;
};

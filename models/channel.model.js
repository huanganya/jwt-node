module.exports = (sequelize, Sequelize) => {
    const Channel = sequelize.define("channel", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        title: {
            type: Sequelize.STRING,
            allowNull: false
        },

        description: {
            type: Sequelize.STRING,
            allowNull: false
        },

        category: {
            type: Sequelize.STRING,
            allowNull: false
        },

        thumbnail: {
            type: Sequelize.STRING,
            allowNull: false
        },

        playercanvas: {
            type: Sequelize.STRING,
            allowNull: false
        },

        subtitle: {
            type: Sequelize.STRING,
            allowNull: false
        },

        unique: {
            type: Sequelize.STRING,
            allowNull: false
        },

        playlist: {
            type: Sequelize.STRING,
            allowNull: false
        },

        keywords: {
            type: Sequelize.STRING,
            allowNull: false
        },

        media: {
            type: Sequelize.STRING,
            allowNull: false
        },

        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        mins: {
            type: Sequelize.STRING,
            allowNull: false
        },

        size: {
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

    return Channel;
};

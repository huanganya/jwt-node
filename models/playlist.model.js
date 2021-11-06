module.exports = (sequelize, Sequelize) => {  
    const Playlist = sequelize.define("playlist", {
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

        visibility: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        user_id: {
            type: Sequelize.INTEGER,
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

    return Playlist;
};

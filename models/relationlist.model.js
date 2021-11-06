module.exports = (sequelize, Sequelize) => {  
    const RelationList = sequelize.define("relationlist", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        playlist_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        channel_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        type: {
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

    return RelationList;
};

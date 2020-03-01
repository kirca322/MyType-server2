module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'users_categories_video',
    {
      video: {
        type: DataTypes.STRING,
        allowNull: false
      },
      users_categories_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false,
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  );
};

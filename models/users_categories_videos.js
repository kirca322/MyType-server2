module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'users_categories_videos',
    {
      video: {
        type: DataTypes.STRING(1234),
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

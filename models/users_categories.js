module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'users_categories',
    {
      categories_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      users_id: {
        type: DataTypes.STRING,
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

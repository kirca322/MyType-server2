module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'categories',
    {
      category_name: {
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

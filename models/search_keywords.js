module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'search_keywords',
    {
      category_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      item: {
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

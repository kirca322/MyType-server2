module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'category',
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
      timestamps: false
    }
  );
};

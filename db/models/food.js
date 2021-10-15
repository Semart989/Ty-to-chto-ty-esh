const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      Food.belongsTo(User);
    }
  }
  Food.init({
    nameFood: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    protein: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    fat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    carbohydrate: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    calories: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};

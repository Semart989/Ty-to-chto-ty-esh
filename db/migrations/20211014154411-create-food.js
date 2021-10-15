'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Food', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameFood: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      protein: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      fat: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      carbohydrate: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      calories: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Food');
  }
};

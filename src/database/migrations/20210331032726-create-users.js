'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('users', { id: Sequelize.INTEGER });
  },

  down: async (queryInterface) => {
    
    await queryInterface.dropTable('users');
     
  }
};

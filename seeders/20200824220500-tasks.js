'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    
    await queryInterface.bulkInsert('Tasks', [{
      description: 'Batata',
      ready: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: 'Cenoura',
      ready: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      description: 'Maçãs',
      ready: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {}
}

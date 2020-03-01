'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      'search_keywords',
      [
        {
          category_number: 1,
          item: '이별노래'
        },
        {
          category_number: 2,
          item: '내적댄스'
        },
        {
          category_number: 3,
          item: '잠안올때듣는노래'
        },
        {
          category_number: 4,
          item: '위로노래'
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

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
          item: '코로나'
        },
        {
          category_number: 2,
          item: '브이로그'
        },
        {
          category_number: 3,
          item: '먹방'
        },
        {
          category_number: 4,
          item: '여행'
        },
        {
          category_number: 5,
          item: '넷플릭스 영화추천'
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

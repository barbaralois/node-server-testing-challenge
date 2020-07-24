exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('animals')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('animals').insert([
        { name: 'monkey' },
        { name: 'pig' },
        { name: 'cat' },
      ]);
    });
};

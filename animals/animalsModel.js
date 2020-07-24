const db = require('../data/connection.js');

module.exports = {
  insert,
  remove,
  getAll,
  findById,
};

async function insert(animal) {
  return db('animals').insert(animal, 'id');
}

function remove(id) {
  return db('animals').where('id', id).del();
}

function getAll() {
  return db('animals');
}

function findById(id) {
  return db('animals').where({ id }).first();
}

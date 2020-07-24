const Animals = require('./animalsModel.js');
const db = require('../data/connection.js');

describe('animals model', () => {
  describe('insert method', () => {
    beforeEach(async () => {
      await db('animals').truncate();
    });

    it('should insert the provided animal into the database', async () => {
      await Animals.insert({ name: 'Dog' });
      await Animals.insert({ name: 'Horse' });

      const animals = await db('animals');
      expect(animals).toHaveLength(2);
    });
  });

  describe('delete method', () => {
    beforeEach(async () => {
      await db('animals').truncate();
    });

    it('should delete an entry from the database', async () => {
      await Animals.insert({ name: 'Cow' });
      let animals = await db('animals');
      expect(animals).toHaveLength(1);
      await Animals.remove(1);
      animals = await db('animals');
      expect(animals).toHaveLength(0);
    });
  });
});

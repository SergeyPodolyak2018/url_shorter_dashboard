/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Users').del();
  await knex('Users').insert([
    { colName: 'rowValue1' },
    { id: 2, colName: 'rowValue2' },
    { id: 3, colName: 'rowValue3' },
  ]);
};

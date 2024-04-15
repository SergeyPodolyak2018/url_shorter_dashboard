const crypto = require('crypto'); 
const bcrypt = require('bcrypt');
const password = process.env['ADMIN'];

const hash = crypto.createHmac('sha256') 
                   .update(password);
                   const encryptPass = await bcrypt.hash(password, 10);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('Users').del();
  await knex('Users').insert([
    { email: 'admin@admin.com', name:'admin', password:, role:'admin' },
    { id: 2, colName: 'rowValue2' },
    { id: 3, colName: 'rowValue3' },
  ]);
};

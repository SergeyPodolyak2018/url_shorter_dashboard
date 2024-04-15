const { createHash } = require('crypto');
const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const password = process.env['ADMIN'] || 'admin';
  const hash = createHash('sha256').update(password).digest('hex');

  const encryptPass = await bcrypt.hash(hash, 10);
  // Deletes ALL existing entries
  await knex('Users').del();
  await knex('Users').insert([
    {
      email: 'admin@admin.com',
      name: 'admin',
      password: encryptPass,
      role: 'admin',
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('Users', (table) => {
      table.increments('id').primary();
      table.text('email').unique().notNullable();
      table.text('name').notNullable();
      table.text('password').notNullable();
      table
        .timestamp('created_time', { useTz: false })
        .defaultTo(knex.raw('UNIXEPOCH'));
    })
    .createTable('Urls', (table) => {
      table.increments('id').primary();
      table.string('uiid', 100).unique().notNullable();
      table.text('url').notNullable();
      table.integer('visits').defaultTo(0);
      table.timestamp('created_time', { useTz: false });
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('Users.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('Users').dropTable('Urls');
};

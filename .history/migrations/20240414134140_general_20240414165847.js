/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema
    .createTable('Urls', (table) => {
      table.increments('id').primary();
      table.text('uiid').unique().notNullable();
      table.text('url').notNullable();
      table.integer('visits').defaultTo(0);
      table.integer('created_time').defaultTo(0);
      table.integer('user_id').notNullable();
      table.foreign('user_id').references('Users.id');
    })
    .createTable('Users', (table) => {
      table.increments('id').primary();
      table.text('email').unique().notNullable();
      table.text('name').notNullable();
      table.text('password').notNullable();
      table.timestamp('created_time', { useTz: false }).defaultTo(0);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};

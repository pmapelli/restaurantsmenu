exports.up = function (knex) {
  return knex.schema.createTable("restaurants", function (table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("address").notNullable();
    table.string("city").notNullable();
    table.string("uf").notNullable();
    table.string("password").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("restaurants");
};

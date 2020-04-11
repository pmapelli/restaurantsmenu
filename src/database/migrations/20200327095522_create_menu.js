
exports.up = function(knex) {
return knex.schema.createTable('menus', function(table){
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    //relacionamento
    table.string('restaurant_id').notNullable();
    //chave estrangeira
    table.foreign('restaurant_id').references('id').inTable('restaurants');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('menus');
};
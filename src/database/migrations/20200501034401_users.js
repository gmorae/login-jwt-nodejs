
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id_user')
        table.string('username').notNullable()
        table.string('password').notNullable()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users')
};

var knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./cms.db3"
    }
});

module.exports = knex;
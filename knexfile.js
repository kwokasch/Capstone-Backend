module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/lost-pet-finder',
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection:'postgres://localhost/<examples_test>',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2, 
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + './migrations'
    },
    seeds: {
      directory: __dirname + './seeds'
    },
    useNullAsDefault: true
  }
}
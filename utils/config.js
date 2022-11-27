const { NODE_ENV, PORT, MONGO_DB } = process.env;

const PORT_CONFIG = NODE_ENV === 'production' ? PORT : 3001;
const DB_CONFIG = NODE_ENV === 'production' ? MONGO_DB : 'mongodb://localhost:27017/moviesdb_dev';

module.exports = {
  PORT_CONFIG,
  DB_CONFIG,
};

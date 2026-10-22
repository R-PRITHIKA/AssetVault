const { MongoClient } = require('mongodb');
let client;
let database;
async function connect() {
  if (database) return database;
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
  client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  database = client.db(process.env.MONGODB_DB || 'assetvault');
  await Promise.all([
    database.collection('users').createIndex({ email: 1 }, { unique: true }),
    database.collection('assets').createIndex({ stored_name: 1 }, { unique: true }),
    database.collection('assets').createIndex({ deleted_at: 1, created_at: -1 }),
    database.collection('access_requests').createIndex({ asset_id: 1, requester_id: 1 }, { unique: true }),
    database.collection('access_requests').createIndex({ owner_id: 1, status: 1 }),
    database.collection('saved_searches').createIndex({ user_id: 1, created_at: -1 }),
    database.collection('notifications').createIndex({ user_id: 1, read_at: 1, created_at: -1 }),
    database.collection('audit_logs').createIndex({ created_at: -1 }),
    database.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
  ]);
  return database;
}
function collection(name) {
  if (!database) throw new Error('MongoDB is not connected. Configure MONGODB_URI and start MongoDB.');
  return database.collection(name);
}
function close() { return client?.close(); }
module.exports = { connect, collection, close };

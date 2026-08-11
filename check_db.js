const Database = require('better-sqlite3');
const db = new Database('data/funnel.db');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', JSON.stringify(tables, null, 2));
try {
  const users = db.prepare('SELECT * FROM users').all();
  console.log('Users:', JSON.stringify(users, null, 2));
} catch(e) {
  console.log('users table error:', e.message);
}
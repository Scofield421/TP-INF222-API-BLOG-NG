const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../database/blog.db');

const db = new Database(dbPath);

console.log("Connecté à la base SQLite.");

db.prepare(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    auteur TEXT NOT NULL,
    date TEXT NOT NULL,
    categorie TEXT NOT NULL,
    tags TEXT
  )
`).run();

module.exports = db;

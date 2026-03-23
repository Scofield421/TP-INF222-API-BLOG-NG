const db = require('../config/db');

const Article = {
  create: (data, callback) => {
    try {
      const stmt = db.prepare(`
        INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      const result = stmt.run(
        data.titre,
        data.contenu,
        data.auteur,
        data.date,
        data.categorie,
        data.tags
      );

      callback(null, { id: result.lastInsertRowid, ...data });
    } catch (err) {
      callback(err, null);
    }
  },

  findAll: (filters, callback) => {
    try {
      let sql = `SELECT * FROM articles WHERE 1=1`;
      const params = [];

      if (filters.categorie) {
        sql += ` AND categorie = ?`;
        params.push(filters.categorie);
      }

      if (filters.auteur) {
        sql += ` AND auteur = ?`;
        params.push(filters.auteur);
      }

      if (filters.date) {
        sql += ` AND date = ?`;
        params.push(filters.date);
      }

      sql += ` ORDER BY id DESC`;

      const stmt = db.prepare(sql);
      const rows = stmt.all(...params);

      callback(null, rows);
    } catch (err) {
      callback(err, null);
    }
  },

  findById: (id, callback) => {
    try {
      const stmt = db.prepare(`SELECT * FROM articles WHERE id = ?`);
      const row = stmt.get(id);

      callback(null, row);
    } catch (err) {
      callback(err, null);
    }
  },

  update: (id, data, callback) => {
    try {
      const stmt = db.prepare(`
        UPDATE articles
        SET titre = ?, contenu = ?, auteur = ?, date = ?, categorie = ?, tags = ?
        WHERE id = ?
      `);

      const result = stmt.run(
        data.titre,
        data.contenu,
        data.auteur,
        data.date,
        data.categorie,
        data.tags,
        id
      );

      callback(null, result.changes);
    } catch (err) {
      callback(err, null);
    }
  },

  delete: (id, callback) => {
    try {
      const stmt = db.prepare(`DELETE FROM articles WHERE id = ?`);
      const result = stmt.run(id);

      callback(null, result.changes);
    } catch (err) {
      callback(err, null);
    }
  },

  search: (query, callback) => {
    try {
      const stmt = db.prepare(`
        SELECT * FROM articles
        WHERE titre LIKE ? OR contenu LIKE ?
        ORDER BY id DESC
      `);

      const searchTerm = `%${query}%`;
      const rows = stmt.all(searchTerm, searchTerm);

      callback(null, rows);
    } catch (err) {
      callback(err, null);
    }
  }
};

module.exports = Article;

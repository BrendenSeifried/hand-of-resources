const pool = require('../utils/pool');

class Book {
  id;
  title;
  release;
  author;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.release = row.release;
    this.author = row.author;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows.map((items) => new Book(items));
  }
}

module.exports = Book;

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
    const { rows } = await pool.query('SELECT title FROM books');
    return rows.map((items) => new Book(items));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT title, author, release FROM books WHERE id = $1',
      [id]
    );
    console.log(rows);
    if (!rows[0]) return null;
    return new Book(rows[0]);
  }
}

module.exports = Book;

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
    if (!rows[0]) return null;
    return new Book(rows[0]);
  }

  static async create({ title, release, author }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, release, author) VALUES ($1, $2, $3) RETURNING *',
      [title, release, author]
    );
    return new Book(rows[0]);
  }

  static async updateById(id, info) {
    const updated = await Book.getById(id);
    if (!updated) return null;
    const { title, release, author } = { ...updated, ...info };
    const { rows } = await pool.query(
      `UPDATE books SET title=$2, release=$3, author=$4 WHERE id=$1 RETURNING *`,
      [id, title, release, author]
    );
    return new Book(rows[0]);
  }
}

module.exports = Book;

const pool = require('../utils/pool');

class Game {
  id;
  title;
  release;
  genre;
  console;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.release = row.release;
    this.genre = row.genre;
    this.console = row.console;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM games WHERE id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Game(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT title FROM games');
    return rows.map((item) => new Game(item));
  }
}

module.exports = Game;

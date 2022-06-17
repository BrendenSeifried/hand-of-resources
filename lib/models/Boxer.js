const pool = require('../utils/pool');

class Boxer {
  id;
  name;
  dob;
  wins;
  losses;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.wins = row.wins;
    this.losses = row.losses;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT name FROM boxers');
    return rows.map((item) => new Boxer(item));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM boxers WHERE id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Boxer(rows[0]);
  }

  static async create({ name, dob, wins, losses }) {
    const { rows } = await pool.query(
      'INSERT INTO boxers (name, dob, wins, losses) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, dob, wins, losses]
    );
    return new Boxer(rows[0]);
  }
}

module.exports = Boxer;

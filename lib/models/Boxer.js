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
}

module.exports = Boxer;

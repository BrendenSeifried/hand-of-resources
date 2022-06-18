const pool = require('../utils/pool');

class NBA {
  id;
  name;
  city;
  state;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.city = row.city;
    this.state = row.state;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT name FROM nbaTeams');
    return rows.map((item) => new NBA(item));
  }
}
module.exports = NBA;

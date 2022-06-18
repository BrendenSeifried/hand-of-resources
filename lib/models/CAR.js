const pool = require('../utils/pool');

class CAR {
  id;
  make;
  model;
  year;

  constructor(row) {
    this.make = row.make;
    this.model = row.model;
    this.year = row.year;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);
    if (!rows[0]) return null;
    return new CAR(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT model FROM cars');
    return rows.map((items) => new CAR(items));
  }
}
module.exports = CAR;

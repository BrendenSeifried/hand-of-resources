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

  static async getAll() {
    const { rows } = await pool.query('SELECT model FROM cars');
    return rows.map((items) => new CAR(items));
  }
}
module.exports = CAR;

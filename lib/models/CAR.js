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

  static async removeCar(id) {
    const { rows } = await pool.query(
      `DELETE FROM cars WHERE id = $1 RETURNING *`,
      [id]
    );
    return new CAR(rows[0]);
  }

  static async update(id, info) {
    const replace = await CAR.getById(id);
    if (!replace) return null;
    const { make, model, year } = { ...replace, ...info };
    const { rows } = await pool.query(
      `UPDATE cars SET make=$2, model=$3, year=$4 WHERE id = $1 RETURNING *`,
      [id, make, model, year]
    );
    return new CAR(rows[0]);
  }

  static async create({ make, model, year }) {
    const { rows } = await pool.query(
      'INSERT INTO cars (make, model, year) VALUES ($1, $2, $3) RETURNING *',
      [make, model, year]
    );
    return new CAR(rows[0]);
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

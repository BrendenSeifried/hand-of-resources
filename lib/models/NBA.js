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

  static async replaceTeam(id, info) {
    const replace = await NBA.getById(id);
    if (!replace) return null;
    const { name, city, state } = { ...replace, ...info };
    const { rows } = await pool.query(
      `UPDATE nbaTeams SET name=$2, city=$3, state=$4 WHERE id = $1 RETURNING *`,
      [id, name, city, state]
    );
    return new NBA(rows[0]);
  }

  static async newTeam({ name, city, state }) {
    const { rows } = await pool.query(
      'INSERT INTO nbaTeams (name, city, state) VALUES ($1,$2,$3) RETURNING *',
      [name, city, state]
    );
    return new NBA(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM nbaTeams WHERE id = $1', [
      id,
    ]);
    if (!rows[0]) return null;
    return new NBA(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT name FROM nbaTeams');
    return rows.map((item) => new NBA(item));
  }
}
module.exports = NBA;

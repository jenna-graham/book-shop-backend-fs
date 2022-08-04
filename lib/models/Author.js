const pool = require('../utils/pool');

module.exports = class Author {
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = new Date(row.dob);
    console.log(row);
    this.pob = row.pob;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * from authors');
    return rows.map((row) => new Author(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT authors.*,
        COALESCE(
        json_agg(to_jsonb(books))
          FILTER (where book_id is not null), '[]' 
        ) AS books from authors
        LEFT JOIN authors_books on authors_books.author_id = authors.id
        LEFT JOIN books on authors_books.book_id = books.id
        WHERE authors.id = $1
        GROUP BY authors.id`,
      [id]
    );
    // if (!rows[0]) return null;
    return new Author(rows[0]);
  }
  static async addAuthor(author) {
    const { rows } = await pool.query(
      'INSERT INTO author (name, dob, pob) VALUES ($1, $2, $3) returning *;',
      [author.name, author.dob, author.pob]
    );
    return new Author(rows[0]);
  }
};

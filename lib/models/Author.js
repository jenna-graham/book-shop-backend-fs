const pool = require('../utils/pool');

module.exports = class Author {
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = new Date(row.dob).toLocaleDateString();
    this.pob = row.pob;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * from authors');
    return rows.map((row) => new Author(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT authors.* FROM authors
      WHERE authors.id = $1
      `,
      [id]
    );
    // if (!rows[0]) return null;

    return new Author(rows[0]);
  }
  static async addAuthor(author) {
    const { rows } = await pool.query(
      'INSERT INTO authors (name, dob, pob) VALUES ($1, $2, $3) returning *;',
      [author.name, author.dob, author.pob]
    );
    console.log(rows[0]);
    return new Author(rows[0]);
  }
  async getBooksByAuthorId() {
    const { rows } = await pool.query(
      `SELECT books.*
      from authors
      LEFT JOIN authors_books on authors_books.author_id = authors.id
      LEFT JOIN books on authors_books.book_id = books.id
      WHERE authors.id = $1`,
      [this.id]
    );
    this.books = rows;
    return this;
  }
};

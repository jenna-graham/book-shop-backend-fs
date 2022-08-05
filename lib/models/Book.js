const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }
  static async getAll() {
    const { rows } = await pool.query('SELECT * from books');
    return rows.map((row) => new Book(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT books.* FROM books
      WHERE books.id = $1
      `,
      [id]
    );
    // if (!rows[0]) return null;
    return new Book(rows[0]);
  }

  static async addBook(book) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, released) VALUES ($1, $2) returning *;',
      [book.title, book.released]
    );
    return new Book(rows[0]);
  }

  async getAuthorsByBookId() {
    const { rows } = await pool.query(
      `SELECT authors.*
      from books
      LEFT JOIN authors_books on authors_books.book_id = books.id
      LEFT JOIN authors on authors_books.author_id = authors.id
      WHERE books.id = $1`,
      [this.id]
    );
    this.authors = rows;
    return this;
  }
};

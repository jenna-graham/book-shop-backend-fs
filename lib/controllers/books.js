const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    const ids = books.map((book) => ({ id: book.id, title: book.title }));
    res.json(ids);
  })
  .get('/:id', async (req, res) => {
    const book = await Book.getById(req.params.id);
    res.json(book);
  })

  .post('/', async (req, res) => {
    const newBook = await Book.addBook(req.body);
    res.json(newBook);
  });

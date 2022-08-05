const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    const ids = authors.map((author) => ({ id: author.id, name: author.name }));
    res.json(ids);
  })
  .get('/:id', async (req, res) => {
    const author = await Author.getById(req.params.id);
    await author.getBooksByAuthorId();
    res.json(author);
  })
  .post('/', async (req, res) => {
    const newAuthor = await Author.addAuthor(req.body);
    res.json(newAuthor);
  });

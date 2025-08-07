const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// In-memory book data
let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "1984", author: "George Orwell" }
];

// GET: All books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST: Add a book
app.post('/books', (req, res) => {
  const newBook = req.body;
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT: Update a book by ID
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    books[index] = req.body;
    res.json(books[index]);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// DELETE: Remove a book by ID
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = books.length;
  books = books.filter(book => book.id !== id);

  if (books.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`📚 Book API server is running at http://localhost:${port}`);
});

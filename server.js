const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'reviews.json');

app.use(cors());
app.use(express.json());

// Serve static files from the root directory (where your HTML, CSS, JS files are)
app.use(express.static(path.join(__dirname)));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'ulasan.html'));
});

// Load reviews from file or initialize empty array
let reviews = [];
if (fs.existsSync(DATA_FILE)) {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  try {
    reviews = JSON.parse(data);
  } catch (err) {
    reviews = [];
  }
}

// GET /reviews - return all reviews
app.get('/reviews', (req, res) => {
  res.json(reviews);
});

// POST /reviews - add a new review
app.post('/reviews', (req, res) => {
  const { name, comment, rating } = req.body;
  if (!name || !comment || !rating) {
    return res.status(400).json({ error: 'Name, comment, and rating are required.' });
  }
  const newReview = { name, comment, rating };
  reviews.push(newReview);
  fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2));
  res.status(201).json({
    name: newReview.name,
    comment: newReview.comment,
    rating: newReview.rating
  });
});

app.listen(PORT, () => {
  const host = process.env.HOST || 'localhost';
  console.log(`Server running on http://${host}:${PORT}`);
});

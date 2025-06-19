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

// Load reviews from file or initialize empty array
let reviews = [];
function loadReviews() {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    try {
      reviews = JSON.parse(data);
    } catch (err) {
      reviews = [];
    }
  } else {
    reviews = [];
  }
}
loadReviews();

// GET /reviews - return all reviews
app.get('/reviews', (req, res) => {
  loadReviews();
  res.json(reviews);
});

const writeReviews = (reviews) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(reviews, null, 2));
    console.log('Reviews saved successfully.');
  } catch (error) {
    console.error('Error saving reviews:', error);
  }
};

// POST /reviews - add a new review
app.post('/reviews', (req, res) => {
  const { name, comment, rating } = req.body;
  if (!name || !comment || !rating) {
    return res.status(400).json({ error: 'Name, comment, and rating are required.' });
  }
  const newReview = { name, comment, rating };
  loadReviews();
  reviews.push(newReview);
  writeReviews(reviews);
  res.status(201).json(newReview);
});

// DELETE /reviews/:index - delete a review by index
app.delete('/reviews/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (isNaN(index)) {
    return res.status(400).json({ error: 'Invalid index' });
  }
  loadReviews();
  if (index < 0 || index >= reviews.length) {
    return res.status(404).json({ error: 'Review not found' });
  }
  reviews.splice(index, 1);
  writeReviews(reviews);
  res.status(200).json({ message: 'Review deleted' });
});

// Serve ulasan.html for all other routes (catch-all) - move this to the bottom
app.get('*', (req, res) => {
  console.log(`Request received for: ${req.originalUrl}`);
  res.sendFile(path.join(__dirname, 'ulasan.html'));
});

app.listen(PORT, () => {
  const host = process.env.HOST || 'localhost';
  console.log(`Server running on http://${host}:${PORT}`);
});

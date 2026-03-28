const express = require('express');
const path = require('path');
const restaurants = require('./data/restaurants');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET all restaurants (supports ?search=, ?quiet=true, ?feature=Kids+Menu, ?borough=Brooklyn)
app.get('/api/restaurants', (req, res) => {
  const { search, quiet, feature, borough } = req.query;

  let results = [...restaurants];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.neighborhood.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (quiet === 'true') {
    results = results.filter(r => r.quiet === true);
  }

  if (feature) {
    results = results.filter(r =>
      r.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))
    );
  }

  if (borough) {
    results = results.filter(r =>
      r.neighborhood.toLowerCase().includes(borough.toLowerCase())
    );
  }

  res.json({ count: results.length, restaurants: results });
});

// GET single restaurant by ID
app.get('/api/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });
  res.json(restaurant);
});

// Serve the frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Family Eats NYC running at http://localhost:${PORT}`);
});

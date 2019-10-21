const express = require('express');
const router = express.Router();

// We'll create our routes here ↓
// Getting all
router.get('/', (req, res) => {
  res.send('Hello, world!');
});
// Getting one
router.get('/:id', (req, res) => {
  res.send(req.params.id);
});
// Creating one
router.post('/', (req, res) => {});
// Updating one
router.patch('/:id', (req, res) => {});
// Deleting one
router.delete('/:id', (req, res) => {});

module.exports = router;

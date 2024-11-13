const express = require('express');

// Create an instance of an Express application
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to serve static files (optional)
app.use(express.static('public'));

// Home route, not a route we want to use...
app.get('/', (req, res) => {
    res.status(500);
    res.send('Please input a valid route');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
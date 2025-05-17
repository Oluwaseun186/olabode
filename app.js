const express = require('express');
const path = require('path');
const app = express();

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files - THIS IS CRUCIAL
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
// Routes
app.get('/', (req, res) => {
    res.render('index');
});

const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
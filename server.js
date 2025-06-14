const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/games.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'games.html'));
});

app.get('/balance.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'balance.html'));
});

app.get('/deposit.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'deposit.html'));
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

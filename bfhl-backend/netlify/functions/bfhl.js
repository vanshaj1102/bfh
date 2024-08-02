const express = require('express');
const app = express();

app.use(express.json());

// POST method endpoint
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const numbers = [];
    const alphabets = [];
    let highest_alphabet = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (!highest_alphabet || item.toLowerCase() > highest_alphabet.toLowerCase()) {
                highest_alphabet = item;
            }
        }
    });

    res.json({
        is_success: true,
        user_id: "your_name_ddmmyyyy",
        email: "your_email@college.com",
        roll_number: "your_roll_number",
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highest_alphabet ? [highest_alphabet] : []
    });
});

// GET method endpoint
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the BFHL API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

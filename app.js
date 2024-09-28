const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Root endpoint - a simple form for input
app.get('/', (req, res) => {
  res.send(`
        <h1>BMI Calculator</h1>
        <form action="/calculate" method="POST">
            <label for="weight">Weight (kg): </label>
            <input type="number" name="weight" step="any" required>
            <br><br>
            <label for="height">Height (m): </label>
            <input type="number" name="height" step="any" required>
            <br><br>
            <button type="submit">Calculate BMI</button>
        </form>
    `);
});

// Endpoint to handle BMI calculation
app.post('/calculate', (req, res) => {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  if (!weight || !height || height <= 0) {
    return res.send('Invalid input. Please enter valid numbers for weight and height.');
  }

  const bmi = weight / (height * height);
  let category;

  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi < 24.9) {
    category = 'Normal weight';
  } else if (bmi < 29.9) {
    category = 'Overweight';
  } else {
    category = 'Obesity';
  }
  // wdaw
  res.send(`
        <h1>Your BMI: ${bmi.toFixed(2)}</h1>
        <p>Category: ${category}</p>
        <a href="/">Calculate Again</a>
    `);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

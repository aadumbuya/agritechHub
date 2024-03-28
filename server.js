const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML and CSS files
app.use(express.static('public'));

// Endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, price, image, producer } = req.body;

    // Create a new product object
    const newProduct = {
        name,
        price: parseFloat(price),
        image,
        producer,
    };

    // Read existing data from the JSON file
    let jsonData = [];
    try {
        const data = fs.readFileSync('products.json', 'utf8');
        jsonData = JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Append the new product data to the array
    jsonData.push(newProduct);

    // Write the updated data back to the JSON file
    try {
        fs.writeFileSync('products.json', JSON.stringify(jsonData, null, 2));
    } catch (error) {
        console.error('Error writing to JSON file:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ message: 'Form submitted successfully', productData: newProduct });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express')

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const {name, email, password, age} = req.body
    const errors = validateForm(name, email, password, age)

    if (errors.length > 0) {
        res.send(`
            ${errors.map(error => `<p class='error'>${error}</p>`).join('')}
        `);
    } else {
        res.send(`
            <p class='success'>Validation successful. Form data is valid.</p>
        `);
    }
})


function validateForm(name, email, password, age) {
    const errors = [];

    // Validate name
    if (!name) {
        errors.push('Name is required.');
    } else if (!/^[a-zA-Z ]*$/.test(name) || name.length < 2 || name.length > 50) {
        errors.push('Name must be alphabetic and between 2 and 50 characters.');
    }

    // Validate email
    if (!email) {
        errors.push('Email is required.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Invalid email format.');
    }

    // Validate password
    if (!password) {
        errors.push('Password is required.');
    } else if (password.length < 6) {
        errors.push('Password must be at least 6 characters long.');
    }

    // Validate age
    if (age) {
        const ageNumber = parseInt(age, 10);
        if (isNaN(ageNumber) || ageNumber < 1 || ageNumber > 120) {
            errors.push('Age must be a number between 1 and 120.');
        }
    }

    return errors;
}

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

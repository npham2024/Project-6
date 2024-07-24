// import express module from npm
const express = require('express');
const app = express();

// access index.html in public folder
app.use(express.static('public'));

// Middleware that url endcoded payloads
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const { name, email, password, age } = req.body;
    const errors = validateForm(name, email, password, age);

    // Maps errors from validation function or sends success
    const messagesHTML = errors.length > 0 
        ? errors.map(error => `<p class='error'>${error}</p>`).join('')
        : "<p class='success'>Validation successful. Form data is valid.</p>";

    // Resend the entire form
    res.send(`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Form Validation Lab</title>
            <style>
                @import 'https://fonts.googleapis.com/css?family=Montserrat%7CRaleway%7CSource+Code+Pro';
                body { font-family: 'Raleway', sans-serif; }
                h2 { font-family: 'Montserrat', sans-serif; }
                .container {
                    max-width: 1024px;
                    width: 100%;
                    margin: 0 auto;
                }
                .error { color: red; }
                .success { color: green; }
            </style>
        </head>
        <body>
            <div class="container">
                <header>
                    <h2>Form Validation Lab</h2>
                </header>
                <article>
                    <form id="validationForm" method="POST" action="/submit">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name"><br><br>

                        <label for="email">Email:</label>
                        <input type="text" id="email" name="email"><br><br>

                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password"><br><br>

                        <label for="age">Age:</label>
                        <input type="number" id="age" name="age"><br><br>

                        <input type="submit" value="Submit">
                    </form>
                </article>
                <section id="messages">
                    ${messagesHTML}
                </section>
            </div>
            <script></script>
        </body>
        </html>
    `);
});

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

// hosts on localhost:3000
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

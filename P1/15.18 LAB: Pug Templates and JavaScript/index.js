const pug = require('pug');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const templates = {
    1: 'template1.pug',
    2: 'template2.pug',
    3: 'template3.pug',
    4: 'template4.pug'
};

rl.question('Enter the template number (1-4): ', (answer) => {
    const templateNumber = parseInt(answer);
    const templatePath = templates[templateNumber];

    if (!templatePath) {
        console.log('Invalid template number. Please enter a number between 1 and 4.');
        rl.close();
        return;
    }

    // Compile the Pug template to a function
    const compiledFunction = pug.compileFile(templatePath);

    // Data for templates
    const data = {
        states: [
            { name: 'California', population: 39538223 },
            { name: 'Texas', population: 29145505 },
            { name: 'Florida', population: 21538187 },
            { name: 'New York', population: 20201249 },
            { name: 'Pennsylvania', population: 13002700 }
        ],
        people: [
            { name: 'Alice', age: 30, hobbies: ['Reading', 'Hiking'] },
            { name: 'Bob', age: 25, hobbies: ['Gaming', 'Cooking', 'Traveling'] },
            { name: 'Charlie', age: 35, hobbies: [] },
            { name: 'Diana', age: 28, hobbies: ['Dancing'] }
        ]
    };

    // Determine the appropriate data to pass
    let templateData = {};
    if (templateNumber === 2) {
        templateData = { states: data.states };
    } else if (templateNumber === 4) {
        templateData = { people: data.people };
    }

    // Render the template to HTML
    const html = compiledFunction(templateData);

    // Write the HTML to a file
    fs.writeFileSync('output.html', html);

    // Output the HTML to the console
    console.log('Rendered HTML:');
    console.log(html);

    rl.close();
});

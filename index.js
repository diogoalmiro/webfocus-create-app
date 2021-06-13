#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const promisify = require('util').promisify

const child_process = require('child_process');

const rl = readline.createInterface(process.stdin, process.stdout);
const input = promisify(rl.question).bind(rl);

const indexTemplate = (title) => `let WebfocusApp = require('@webfocus/app');

let configuration = {
    port : 0, // Specify your port here
    name : "${title}",
    // Add more configurations here
}

let webfocusApp = new WebfocusApp( configuration );

// Register webfocus/app comonents here
// e.g. webfocusApp.registerComponent(require('../component-example'));

webfocusApp.start();
`

const packageTemplateObj = {
    "name": "",
    "version": "0.0.1",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "node index.js",
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
};

input("Application Name: ").then(title => {
    // Create index.js file
    fs.writeFileSync('index.js', indexTemplate(title), {flag:'wx'});
    
    // Create package.js file
    packageTemplateObj.name = title.toLowerCase().split(' ').join('-');
    fs.writeFileSync('package.json', JSON.stringify(packageTemplateObj, null, '  '), {flag:'wx'});

    // Install dependencies
    child_process.execSync('npm install @webfocus/app');
    return 0;
})
    .catch(e => {console.error(e); return 1})
    .finally(r => process.exit(r))





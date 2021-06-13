#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');
const promisify = require('util').promisify

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
    "license": "ISC",
    "dependencies": {
        "@webfocus/app": "^0.1.2",
    }
};

(async () => {
    let title = await input('Insert application name> ');

    // Create index.js file
    let r = fs.writeFileSync('index.js', indexTemplate(title), {flag:'wx'});
    console.log(r)
    // Create package.js file
    packageTemplateObj.name = title.toLowerCase().split(' ').join('-');
    r = fs.writeFileSync('package.json', JSON.stringify(packageTemplateObj, null, '  '), {flag:'wx'});
    console.log(r)
    return 0
})()
    .catch(e => {console.error(e); return 1})
    .finally(r => process.exit(r))





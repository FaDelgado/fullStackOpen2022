// cross-env => Most Windows command prompts will choke when you set environment variables with NODE_ENV=production.
// use "cross-env" to resolve this problem.
// npm install --save-dev cross-env
// package.json => "scripts": {
    "start": "cross-env NODE_ENV=production node index.js",
    "dev": "cross-env NODE_ENV=development nodemon index.js",
    "test": "cross-env NODE_ENV=test jest --verbose --runInBand"
    ....
}
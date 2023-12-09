const fs = require("fs");

let dataFile = './data.json'

const add = (hash, item) => {
    return new Promise((resolve, reject) => {
        var data = fs.readFileSync(dataFile);
        var data = JSON.parse(data);
        data[hash]= item;
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf8');
        resolve(true);
    })
}

exports.add = add;

const get = (hash) => {
    return new Promise((resolve, reject) => {
        var data = fs.readFileSync(dataFile);
        var data = JSON.parse(data);
        resolve(data[hash]);
    })
}

exports.get = get;
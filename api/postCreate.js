const randomString = require('random-string');

const db = require('../db');

function postCreate(app, admin) {
    app.post('/create', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        var hash = randomString({length: 7});
        db.add(hash, {
            hash: hash,
            long_url: req.body.url,
            short_url: 's.nilssimons.me/' + hash,
            short: 'short.nilssimons.me/' + hash,
            creation_date: new Date()
        })
        res.send(JSON.stringify({
            success: true,
            data: {
                hash: hash,
                long_url: req.body.url,
                short_url: 's.nilssimons.me/' + hash,
                short: 'short.nilssimons.me/' + hash
            }
        }));
    })
}

exports.postCreate = postCreate
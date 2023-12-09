const db = require('../db');

function postGet(app, admin) {
    app.post('/:hash', async (req, res) => {

        res.setHeader('Content-Type', 'application/json');

        var hash = req.params.hash
        var data = await db.get(hash)
    
        if (!data) {
            res.sendStatus(404);
            return;
        }
        res.send(JSON.stringify(data));
    })
}

exports.postGet = postGet
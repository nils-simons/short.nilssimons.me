
function postGet(app, admin) {
    app.post('/:hash', async (req, res) => {

        res.setHeader('Content-Type', 'application/json');

        var hash = req.params.hash
        var urlsSnap = await admin.firestore().collection('urls').where('hash', '==', hash).get();
    
        if (urlsSnap.size == 0) {
            res.sendStatus(404);
            return;
        }
    
    
        url = urlsSnap.docs[0]
        urlData = url.data();
        console.log(`POST: ${hash}`);
    
        res.send(JSON.stringify(urlData));
    })
}

exports.postGet = postGet
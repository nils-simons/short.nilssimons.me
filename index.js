var admin = require("firebase-admin");
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 1333


var serviceAccount = require("./configs/short-nilssimons-me-firebase-adminsdk-8hdmm-0728fe0747.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


app.use(express.json());
app.use(cors());

var postCreate = require('./api/postCreate')
postCreate.postCreate(app, admin)

var postGet = require('./api/postGet')
postGet.postGet(app, admin)

app.get('/:hash', async (req, res) => {
    var hash = req.params.hash
    var urlsSnap = await admin.firestore().collection('urls').where('hash', '==', hash).get();

    if (urlsSnap.size == 0) {
        res.sendStatus(404);
        return;
    }


    url = urlsSnap.docs[0]
    urlData = url.data();
    console.log(`${urlData.short} --> ${urlData.long_url}`);

    res.redirect(urlData.long_url);
})


app.listen(PORT, () => {
  console.log(`short.nilssimons.me running on *:${PORT}`)
})
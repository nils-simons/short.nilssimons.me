const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 1333

const db = require('./db');

app.use(express.static('public'));

app.use(express.json());
app.use(cors());

var postCreate = require('./api/postCreate')
postCreate.postCreate(app)

var postGet = require('./api/postGet')
postGet.postGet(app)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})


app.get('/:hash', async (req, res) => {
    var hash = req.params.hash

    var data = await db.get(hash);

    if (!data) {
      res.sendStatus(404);
      return;
    }

    console.log(`${data.short} --> ${data.long_url}`);

    res.redirect(data.long_url);
})


app.listen(PORT, () => {
  console.log(`short.nilssimons.me running on *:${PORT}`)
})
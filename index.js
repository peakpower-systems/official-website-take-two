const express = require('express');
const session = require('express-session');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'pug');
app.locals.pretty = true;
const port = process.env.PORT || 8080;
const {MongoClient, ServerApiVersion} = require('mongodb');
const client = new MongoClient(process.env.MONGODB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function startup() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err);
    }
}
startup();
const db = client.db('PeakPowerSystems');
const Jobs = db.collection('Jobs');

app.use((req, res, next) => {
    req.collection = Jobs;
    next();
})

app.use(session({
    secret: 'peakpowerwebsite',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,
            maxAge: 600000
    }
}))

app.use(express.static('public'));

// Here are the routes
app.use('/', require('./routes/home'));

app.use((req, res, next) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on port 8080`)
});

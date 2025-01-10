const express = require('express');
const router = express.Router();
const username = "sales@peakpowersystems.com";

router.get('/', async (req, res) => {
    res.render('home');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/products', (req, res) => {
    res.render('products');
});

router.get('/careers', async (req, res) => {
    const records = await req.collection.find({}).toArray();
    res.render('careers', {jobs: records});
});

router.post('/submit', (req, res) => {
  var subjectinput = req.body.subject;
  var message = req.body.message;
  var fax = req.body.fax;
  var spamemail = req.body.emailAddress;
  if (subjectinput === "" || message === "") {
      res.status(400).send('Missing required fields');
  }
  
  if (fax || spamemail){
      res.status(400).send('Spam detected');
  }
  else{
      // Instead of trying to open a mail client, send the necessary data back to the client
      res.json({
          success: true,
          mailto: `mailto:${username}?subject=${encodeURIComponent(subjectinput)}&body=${encodeURIComponent(message)}`
      });
  }
});

router.get('/:ID(\\d+)', async (req, res) => {
    const job = await req.collection.find({JobID: parseInt(req.params.ID)}).toArray();
    if (job.length === 0) {
        const record = {ID: req.params.ID, Name: 'No Job Name', Description: 'No Job Description'};
        res.render('jobdescription', { currentjob: record });
    }
    else {
        res.render('jobdescription', { currentjob: job[0] });
    }
});

router.get('/residential', async (req, res) => {
    res.render('residential');
});

router.get('/commercial', async (req, res) => {
    res.render('commercial');
});

router.get('/industrial', async (req, res) => {
    res.render('industrial');
});

router.get('/capabilities', async (req, res) => {
    res.render('capabilities');
});

module.exports = router;
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Job = require("../lib/Job");
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

router.post('/saveJob', function(req, res) {
    console.log('Saving ' + req.body.position + ' position at ' + req.body.company);
    return res.status(200).send();
})

module.exports = router;
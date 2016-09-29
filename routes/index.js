var mongoose    = require('mongoose');
var express = require('express');
var router = express.Router();
var model = require('../models/model');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/file', function(req, res, next){
	var data = JSON.parse(req.body.values);
	var newModel = new model(data);
            //Save it into the DB.
    newModel.save(function(err){
        if(err) res.json({error: "Something went wrong. Please try again later."});
        //If no errors, send it back to the client
        res.json({success: "Record created successfully"});
    });
});

module.exports = router;

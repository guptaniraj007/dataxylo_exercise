var express = require('express');
var mongoose = require('mongoose');
var Model = mongoose.model('Model');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/file', function(req, res, next){
	var data = JSON.parse(req.body.values);
	var model = new Model(data);

	model.save(function(err, post){
		if(err){ res.json({"error":"Something went wrong, please try again later."}); }
		res.json({"success":"Record created at " + post.createdAt});
	});
});

router.get('/files', function(req, res, next){

})

module.exports = router;

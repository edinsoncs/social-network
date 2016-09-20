"use strict"; 

var express = require('express');
var router = express.Router();

var functions = require('../moduls/functions');

router.get('/:idpost', function(req, res, next){
	var db = req.db;
	var dashboard = db.get('dashboard');

	res.locals.functions = functions;

	dashboard.find({'id': req.params.idpost}, function(err,  doc) {
		if(err) {
			return err;
		} else {
			renderShow(doc);
			
		}
	});

	function renderShow(data){
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.render('shared/viewpost', {
				view: data
			});
		}
	}



});

module.exports = router;
const router = require('express').Router();

const RestInstantPush = require('./RestInstantPush')

exports.Init = function(params){

	router.route('/',RestInstantPush.index);

	router.route('/prepare/')
			.post(RestInstantPush.prepare);
	console.log('PATTERN :: /prepare/:userid/:sessionid');
	
	router.route('/push/')
		.post(RestInstantPush.push);		
	console.log('PATTERN :: /push/:userid/:sessionid:/:sessionids/:message');

	router.route('/cancel/')
		.post(RestInstantPush.cancel);		
	console.log('/PATTERN :: cancel/:userid/:sessionid/');


	return router;		
}

exports.RestInstantPush = function(){
	return RestInstantPush;
}








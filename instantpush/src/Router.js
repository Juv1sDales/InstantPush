const router = require('express').Router();

const RestInstantPush = require('./RestInstantPush')

exports.Init = function(params){

	RestInstantPush.Init(params);

	router.route('/',RestInstantPush.index);

	router.route('/createChannelApp/')
			.post(RestInstantPush.createChannelApp);
	console.log('PATTERN :: /createChannelApp/:app_key_id/[POST-BODY]');

		router.route('/connectChannelApp/')
			.post(RestInstantPush.connectChannelApp);
	console.log('PATTERN :: /connectChannelApp/:app_key_id/:user_token[POST-BODY]');

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








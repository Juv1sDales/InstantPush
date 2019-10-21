const Session = require('./Session.js');

exports.Init = function(params){
	Session.Init(params);
}

exports.index = function(req,res){
	const date = new Date();
	resp	   = {
		etat:true,
		code:100,
		message:{
			version:1.0,
			InstantPush:'running',
			Access:'300.383',
			datetime:date
		}
	}

	res.json(res);
}

exports.createChannelApp = function(req,res){
	var resp = {
		state:false,
		code:100,
		message:'Création channel application impossible'
	}

	console.log(req.body);

	if(req.body){
		const result = Session.createChannelApp(req.body);
		if(result){
			resp.state   = true;
			resp.code    = 200 ;
			resp.message = 'Création channel application reussi!';
		}
	}

	res.json(resp);	
}

exports.connectChannelApp = function(req,res){
	var resp = {
		state:false,
		code:100,
		message:'Connection at channel application impossible'
	}

	//console.log('::'+req.body.sessionid);

	if(req.body){
		const result = Session.connectChannelApp(req.body);
		if(result){
			resp.state   = true;
			resp.code    = 200 ;
			resp.message = 'Connection at channel application reussi!';
		}
	}

	res.json(resp);	
}

exports.prepare = function(req,res){
	var resp = {
		state:false,
		code:100,
		message:'Enrégistrement impossible'
	}

	//console.log(req.body);
	//x-www-form-urlencoded

	if(req.body){
		const result = Session.prepare(req.body);
		if(result){
			resp.state   = true;
			resp.code    = 200 ;
			resp.message = 'Enrégistrement reussi!';
		}
	}

	res.json(resp);
	//res.end();
}


exports.push = function(req,res){
	var resp = {
		state:false,
		code:100,
		message:'Envoie du message impossible'
	}
	//console.log(req.body);
	if(req.body){
		const result = Session.push(req.body);
		if(result){
			resp.state   = true;
			resp.code    = 200 ;
			resp.message = 'Envoie du message reussi!';
		}
	}	
	res.json(resp);
	//res.end();	
}


exports.register = function(data,socket){
	//console.log('From socket-client::'+data.userid+'-'+data.sessionid);
	return Session.register(data,socket);		
}

exports.disconnect = function(socket){
	//console.log('From socket-client::'+data.userid+'-'+data.sessionid);
	return Session.disconnect(socket);		
}

exports.cancel = function(data){
	var resp = {
		state:false,
		code:100,
		message:'Annulation impossible'
	}
	//console.log(req.body);
	if(req.body){
		const result = Session.cancel(req.body);
		if(result){
			resp.state   = true;
			resp.code    = 200 ;
			resp.message = 'Annulation reussi!';
		}
	}	
	res.json(resp);	
}
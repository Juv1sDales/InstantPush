var sessions = {};

exports.Init = function(params){

	const axios = require('axios');
	axios.get(params.url_app_data)
		 .then(response => {
		 	//console.log(response.data);
		 	for(var i = 0 ; i <response.data.length ; i++)
		 		sessions[response.data[i].application_key] = {};
		 	//console.log(sessions['0e1022da76d80aef7372cf4668e1cc206903c559']);
		 	//console.log('response'+response.data.data[i]);
		 })	

	.catch(error => {
		console.log(error);
		process.exit(0);
	})
}


exports.createChannelApp = function(params){
	console.log(params);
	if(params.userid === undefined){
		return false;	
	}

	if(sessions[params.userid] === undefined){
		sessions[params.userid] = {};

		return true;
	}		

	return false;
}


exports.connectChannelApp = function(params){
	console.log(sessions);
	console.log('::'+sessions[params.userid]);
	if((sessions[params.userid]
				&& sessions[params.userid][params.sessionid] === undefined) && params.sessionid !== undefined){
		//console.log(params.sessionid);
		sessions[params.userid][params.sessionid] = null;
		console.log('Enrégistrement d\'un utilisateur.\n Info : clés:\n'+params.userid+'\nClé :\n '+params.sessionid+'\n\n');

		return true;

	}		

	return false;
}

exports.prepare = function(params){
	console.log('=>'+params);
	if(params.userid === undefined){
		return false;	
	}

	if(sessions[params.userid] === undefined && params.userid !== undefined){
		sessions[params.userid] = {};	
	}

	if((sessions[params.userid]
				&& sessions[params.userid][params.sessionid] === undefined) && params.sessionid !== undefined){
		console.log(params.sessionid);
		sessions[params.userid][params.sessionid] = null;
		console.log('Enrégistrement d\'un utilisateur.\n Info : clés:\n'+params.userid+'\nClé :\n '+params.sessionid+'\n\n');

		return true;

	}		

	return false;
}

exports.register = function(params,socket){
	//console.log(sessions[params.userid]);
	//console.log(sessions[params.userid][params.sessionid]);
	if(sessions[params.userid] != null 
			&& sessions[params.userid][params.sessionid] == null){
		socket.userid    = params.userid;
		socket.sessionid = params.sessionid;
		sessions[params.userid][params.sessionid] = socket;
		//console.log(socket);
		console.log('Utilisateur  est connecté')
		
		return true;	
	}
	
	console.log('Aucune session enrégistrer en ce nom...');
	return false;
}

exports.disconnect = function(socket){
	const userid   	 = socket.userid;
	const sessionid  = socket.sessionid;

	if (userid && sessionid 
				&& sessions[userid][sessionid]){
		sessions[userid][sessionid] = null;
		//delete sessions[sessionid];
		console.log('Utilisateur '+sessionid+'deconnecté');

		return true;
	}

	console.log('Déconnexion de la '+sessionid+' impossible');
	return false;
}

exports.cancel = function(params){
	const userid     = params.userid;
	const sessionsid = params.sessionid;

	if (userid && sessionid 
				&& sessions[userid][sessionid]){
		delete sessions[sessionid];
		console.log('Utilisateur '+sessionid+'deconnecté');

		return true;
	}

	console.log('Déconnexion de la '+sessionid+' impossible');
	return false;
}

exports.reconnect = function(params,socket){
	if(sessions[params.userid]){
		socket.userid 	 = params.userid;
		socket.sessionid = params.sessionid;
		sessions[params.userid][params.sessionid] = socket; 
		//console.log('Utilisateur '+params.sessionid+' est reconnecté');

		return true;
	}

	//console.log('Aucune session enrégistrer en ce nom...');

	return false;
}

exports.push = function(params){
	
	//params = JSON.parse(params);
	//console.log(params.type);

	if(params.type == 'OnlyUser'){
		//console.log('OnlyUser');
		return  pushOneUser(params.userid,
				params.receiverid,params.message);
	}else if(params.type == 'GroupUser'){
		//console.log('GroupUser');
		return pushGroupUser(params);

	}else if(params.type == 'ChannelUser'){
		//console.log('ChannelUser');
		return pushChannel(params);
	}
}


pushOneUser = function(userid,receiverid,message){

	//console.log('receiverid::'+receiverid+"::"+userid);
	//console.log('session::'+sessions[userid][receiverid]);


	if(userid 
			&& sessions[userid][receiverid]){
		sessions[userid][receiverid].emit('message',message);
		console.log('Message envoyé');

		return true;
	}

	console.log('Utilisateur déconnecté');
	return false;
}

pushGroupUser = function(params){
	//console.log(params.userid);
	//console.log(params.receiverids);

	if(params.userid && params.receiverids){

		const receiverids = params.receiverids;
		//console.log(receiverids);

		for(var i = 0 ; i 
				< receiverids.length; i++){
			if(sessions[params.userid][receiverids[i].application_token_user] == null 
					|| sessions[params.userid][receiverids[i].application_token_user] === undefined)
				continue ;

			pushOneUser(params.userid,receiverids[i].application_token_user,params.message);
		}

		//console.log('Message emit well all user');
		return true;
	}
}

pushChannel = function(params){

	if(params.userid && params.sessionid){
		if(sessions[params.userid][params.sessionid]){
			sessions[params.userid][params.sessionid].emit(params.channel,params.message);
			console.log('Message send with success to channel '+params.channel);

			return true;
		}
	}
}

broadcast = function(params){

	if(params.userid && params.sessionid){
		if(sessions[params.userid][params.sessionid]){
			sessions[params.userid][params.sessionid].emit(params.channel,params.message);
			console.log('Message send with success to channel '+params.channel);

			return true;
		}
	}
}







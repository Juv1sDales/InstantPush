var sessions = {};

exports.Init = function(params){

}

exports.prepare = function(params){

	if(sessions[params.userid] === undefined){
		sessions[params.userid] = {};	
	}

	if((sessions[params.userid]
				&& sessions[params.userid][params.sessionid] === undefined)){

		sessions[params.userid][params.sessionid] = null;
		console.log('Enrégistrement d\'un utilisateur.\n Info : clés:\n'+params.userid+'\nClé :\n '+params.sessionid+'\n\n');


		return true;

	}else{

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
		delete sessions[sessionid];
		console.log('Utilisateur '+sessionid+'deconnecté');

		return true;
	}

	console.log('Déconnexion de la '+sessionid+' impossible');
	return false;
}

exports.cancel
 = function(params){
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
		console.log('Utilisateur '+params.sessionid+' est reconnecté');

		return true;
	}

	console.log('Aucune session enrégistrer en ce nom...');

	return false;
}

exports.push = function(params){
	

	if(params.type == 'OnlyUser'){
		return  pushOneUser(params.userid,
				params.receiverid,params.message);

	}else if(params.type == 'GroupUser'){
		return pushGroupUser(params);

	}else if(params.type == 'ChannelUser'){
		return pushChannel(params);
	}
}


pushOneUser = function(userid,receiverid,message){

	console.log('receiverid::'+receiverid+"::"+userid);
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
	if(params.userid && params.receiverids){
		for(var i = 0 ; i 
				< params.receiverids.length; i++){
			pushOneUser(params.userid,
				params.receiverids[i],params.message);
		}

		console.log('Message emit well all user');
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







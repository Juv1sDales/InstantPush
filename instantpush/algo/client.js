/*var stdin = process.openStdin();

stdin.addListener('data',function(d){
	console.log(d.toString());
});*/

const uuidv1 = require('uuid/v1');
const _userid = 'userid_'+uuidv1();
const _sessionid = 'sessionid_'+uuidv1();

console.log('Vos clés : \nClés Identifiant : \n'+_userid+'\nClés Session : \n'+_sessionid+'\n\n');

const qs      = require('qs');
const axios   = require('axios');
const body    = { userid:_userid,sessionid:_sessionid };

const config  = {
	headers:{
		'Content-Type':'application/x-www-form-urlencoded',
	},
};


axios.post('http://localhost:8380/instant/prepare/',qs.stringify(body),config)
.then(function(response){

	if(response.data.state){

		const client = require('socket.io-client')('http://localhost:8380/');

		client.params = {};
		client.params.userid = _userid;
		client.params.sessionid = _sessionid;

		client.on('connect_failed',function(){
			console.log('Vous etes maintenant connecté');
		});

		client.on('connect',function(){
			console.log('Authentification  en cours...');
			client.emit('register',client.params);
		});

		client.on('register',function(data){
			var result = JSON.parse(data);
			if(!result.state)client.disconnect();
			console.log(result.message);
		});


		client.on('message',function(data){
			console.log(data);
		});	

		client.on('disconnect',function(){
			console.log('Vous etes maintenant déconnecté');
			client.disconnect();
		});
	


	}else{
		console.log(result.message)
	}

}).catch(function(err){
	console.log(err);

});



/*const ReadLine = require('readline');
const scan 	   = ReadLine.createInterface({
	input:process.stdin,
	output:process.stdout
});


scan.question('Wait your Input : ',(answer)=>{

	scan.close();
});

/*const message = {
	message:"Bonjour tous le monde...",
	userid :[
		{
			"sessionid":2,
		},
		{
			"sessionid":3,
		}
	]
}*/

//console.log(JSON.stringify(message));

//console.log(JSON.stringify([1,2,3,4]));*/

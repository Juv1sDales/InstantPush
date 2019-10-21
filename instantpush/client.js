/*var stdin = process.openStdin();

stdin.addListener('data',function(d){
	console.log(d.toString());
});*/

//console.log(JSON.parse('[{"token":"sessionid_ae0c4930-b468-11e9-8f66-f32958363bdd"}]'));

const uuidv1 = require('uuid/v1');
const _key_app    = '0e1022da76d80aef7372cf4668e1cc206903c559';
const _user_token = '59c8d0deabdda1a94f0f3100f1f44533263269cf';

//console.log('Vos clés : \nClés Identifiant : \n'+_userid+'\nClés Session : \n'+_sessionid+'\n\n');

const qs      = require('qs');
const axios   = require('axios');
const body    = { app_key:_key_app};

const config  = {
	headers:{
		'Content-Type':'multipart/form-data',
	},
};

//notifications.oliumgroup.com:8380

/*axios.post('http://localhost/projects/instant/subscribe/',qs.stringify(body),config)
.then(function(response){*/

	//if(response.data.state){

		const client = require('socket.io-client')('http://localhost:8080/');

		client.params = {};
		client.params.userid = _key_app;
		client.params.sessionid = _user_token;

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
			console.log(JSON.parse(data));
		});	

		client.on('disconnect',function(){
			console.log('Vous etes maintenant déconnecté');
			client.disconnect();
		});
	


	/*}else{
		console.log(response.data);
	}*/

/*}).catch(function(err){
	console.log('Response::'+err.response.data);
	console.log('Error::'+err.request);

});*/



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

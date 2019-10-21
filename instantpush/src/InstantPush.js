const fs     	= require('fs');
const app		= require('express')();
const http   	= require('http').Server(app);
const io     	= require('socket.io')(http);
const bodyParser= require('body-parser');
const parse  	= require('parse-json');
var config 		= null;

var filename  = null;
var handler   = null;

exports.Init = function(params){
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended:true
	}));

	filename = params.filename;

	io.on('connection',function(socket){
		console.log('Connection d\'un nouvelle utilisateur!');

		socket.on('register',function(data){
			const result = handler.register(data,socket);
			
			if(!result){

				socket.emit('register',

				JSON.stringify({
					state:false,
					message:'Erreur 404',
					code   :-100
				}));

				return;

			}

			socket.emit('register',

							JSON.stringify({
								state:true,
								message:'Vous etes bien connecté',
								code   :200
						}));

		});

		socket.on('disconnect',function(){
			handler.disconnect(socket)
		});		

	});
}

exports.Bind = function(params){
	app.use('/instant',params.route);
}

exports.Handler = function(restInstantPush){
	handler = restInstantPush;
}

exports.start = function(){
	
	fs.readFile(filename,
			function(err,data){

			//console.log(data);
			//config = JSON.parse(data);
			config = parse(data);
			//console.log(config);

			if(config != 'undefined' ||  config){				
				http.listen(process.env.PORT || config.port);
				console.log('Wait connection at port : '+config.port);
			}else
				console.log('Server can\'t start,config is undefined');		
	});	
}
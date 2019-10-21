
//Filename : Main.js
//Created at : 27/06/2019 13:29
var Router      = require('./Router.js');
var InstantPush = require('./InstantPush.js');

//Initatilzation of Router
const route = Router.Init();
//Read Configuration server file and initalize
InstantPush.Init({filename:'./config.json'});
//Bind Route with Server for Http Server
InstantPush.Bind({route:route});
//Config to register en action on socket client,to real time
InstantPush.Handler(Router.RestInstantPush());
//Server start
InstantPush.start();


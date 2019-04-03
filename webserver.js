var http = require('http').createServer(handler); //require http server, and create server with function handler()
var fs = require('fs'); //require filesystem module
var io = require('socket.io')(http) //require socket.io module and pass the http object (server)

var Gpio = require('onoff').Gpio;
var rly1 = new Gpio(17, 'out');
var rly2 = new Gpio(18, 'out');
  rly1.writeSync(1);	//0 = acceso - 1 = spento
  rly2.writeSync(1);	//0 = acceso - 1 = spento

http.listen(8080); //listen to port 8080

function handler (req, res) { //create server
  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}

io.sockets.on('connection', function (socket) {// WebSocket Connection
  var lightvalue = 0; //static variable for current status
  
  socket.on('up', function(data) { //get light switch status from client
    lightvalue = data;
    //console.log(lightvalue);
	rly1.writeSync(1);
	rly2.writeSync(0);
  });
  
  socket.on('down', function(data) { //get light switch status from client
    lightvalue = data;
    //console.log(lightvalue);
	rly2.writeSync(1);
	rly1.writeSync(0);
  });
  
  socket.on('stop', function(data) { //get light switch status from client
    lightvalue = data;
    //console.log(lightvalue);
	rly1.writeSync(1);
	rly2.writeSync(1);
  });
  
  socket.on('logpos', function(data) {
    console.log(data);
  });
});

process.on('SIGINT', function () { //on ctrl+c
  rly1.writeSync(1);
  rly2.writeSync(1);
  //console.log('process.exit');
  process.exit(); //exit completely
});
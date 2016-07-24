var express = require("express");
var app = express();
var port = 8888;
var nicks = [];


app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');

app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("index");
});
 
var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

io.sockets.on('connection', function (socket) {
    socket.emit('missatge', { 
    	missatge: 'Benvingut' 
    });
    socket.on('enviar', function (data) {
    	console.log(data.missatge);
        socket.broadcast.emit('missatge', data);

    });
	socket.on("nick", function(nick) {
	    nicks.push(nick); // Guardamos el nick
	    io.sockets.emit("nicks", nicks); // Emitimos al cliente todos los nicks


	// Cuando alguien se desconecte
	// eliminamos el nick del arreglo
	// y emitimos de nuevo todos los nicks
		socket.on("disconnect", function() {
		    nicks.splice(nicks.indexOf(nick), 1);
		    io.sockets.emit("nicks", nicks);
		});

	});

	socket.on("enviarTema",function(temas){
		io.sockets.emit("temas", temas);
	});
});


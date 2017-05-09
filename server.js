// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var fs 			   = require('file-system');

var mysql      = require('mysql');
// configuration ===========================================
	
var connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : '123123',
   database : 'qrCode'
 });



/*connection.query('SELECT * from qrImageTable', function(err, rows, fields) {
   if (!err)
     console.log('The solution is: ', rows);
   else
     console.log('Error while performing Query.' + err);
 });
 */
 /*var sql = "INSERT INTO qrImageTable (image_title, image_description, image_pgno) values ('Grade1SubjectSciencePgno13', 'desc1', 'pg13')";
  connection.query(sql, function (err, result) {
    if (err){
    	console.log("Error " + err);
    }
    console.log("1 record inserted" + JSON.stringify(result));
  });
 */
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users


//GET POST request handling
app.post('/saveImage',function(req, resp){
	console.log("image = " + req.body.image);

	var base64Data = req.body.image;//.replace(/^data:image\/png;base64,/, "");
	var data = base64Data.replace(/^data:image\/\w+;base64,/, "");
	var buf = new Buffer(data, 'base64');
	fs.writeFile(req.body.image_id'.png', buf);
	resp.send("Hello");
});


app.post('/addToDatabase',function(req, resp){
	console.log("image = " + req.body.image);

	var dataObject = req.body;
	
	var sql = "INSERT INTO qrImageTable (image_title, image_description, image_pgno) values ('" + dataObject.image_title + "','" + dataObject.image_description + "','" + dataObject.image_pgno + "')";
	console.log("SQL::" + sql);

	connection.query(sql, function (err, result) {
	    if (err){
	    	console.log("Error " + err);
	    	resp.status(400).send({data: result});
	    	return;
	    } else{
	    	console.log("1 record inserted" + JSON.stringify(result));	
			connection.query("SELECT * from qrImageTable where image_title = '" + dataObject.image_title + "'", function(err, rows, fields) {
			   	if (!err){
			    	console.log('The solution is: ', rows);
			    	resp.send(rows);
			   	}
			    else{
			     	console.log('Error while performing Query.' + err);
			     	resp.status(400).send({data: err});
			    }
			   
			});    	
	    }
	});
	
});

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Connect to port:: ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app

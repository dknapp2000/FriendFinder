var express = require( "express" );
var path = require( "path" );
var app = express();
var fs = require( "fs" );
var common = require( "./common.js" );

const bodyParser = require( "body-parser" );

var data;

const apiRoutesFile = path.join( __dirname, "app", "routing", "apiRoutes.js" );
const htmlRoutesFile = path.join( __dirname, "app", "routing","htmlRoutes.js" );


const port = 3000;

app.use( function( req, res, next ) {
    console.log( `URL: ${req.url}` );
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var apiRoutes = require( apiRoutesFile )(app);
var htmlRoutes = require( htmlRoutesFile )(app);

app.listen( port, function() {
    console.log( "Listening on port " + port );
    data = common.loadData();
})


 
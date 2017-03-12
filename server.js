var express = require( "express" );
var path = require( "path" );
var app = express();
var fs = require( "fs" );
var common = require( "./common.js" );

const bodyParser = require( "body-parser" );

var data;

const port = process.env.PORT || 3000;

app.use( function( req, res, next ) {
    console.log( `URL: ${req.url}` );
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.post( "/api/friends", function( req, res ) {
    console.dir( req.body );
    let match = findMatch( req.body, common.data );
    console.log( "MATCH! ", match );
    common.data.push( req.body );
    common.saveData();
    res.json( match );
})

app.get( "/", function( req, res, next ) {
    var filePath = path.join( __dirname, "app", "public", "survey-button.html" );
    console.log( "Sending file: " + filePath );
    res.sendFile( filePath );
})

app.get( "/api/friends", function( req,res ) {
    res.json(common.data);
});

app.listen( port, function() {
    console.log( "Listening on port " + port ); 
    data = common.loadData();
});

function findMatch( newEntry, list ) {
    // Compute the absolute difference between our new entry and the current list.
    let result = list.map( ( item ) => {
        let diff = 0;
        for ( let i=0; i<item.scores.length; i++ ) {
            diff += Math.abs( item.scores[i] - newEntry.scores[i] );
        }
        return diff;
    })
    // result[] not contains a list of the abs differences for each entry
    var lowScore = 9999;
    var bestMatch = -1;
    for ( let i = 0; i<result.length; i++ ) {
        if ( result[i] < lowScore ) {
            lowScore = result[i];
            bestMatch = i;
        }
    }
    // The index to the low score is the index to the bext match.
    return list[bestMatch];
}

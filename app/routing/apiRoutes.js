const path = require( "path" );
const common = require( "../../common.js" );
const score = require( "./findMatch.js" );

module.exports = function( app ) {
    console.log( "Loading home.html" );

    app.post( "/api/friends", function( req, res ) {
        console.dir( req.body );
        //common.findMatch( req.body );
        common.addData( req.body );
    })
}
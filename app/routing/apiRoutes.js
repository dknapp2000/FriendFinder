const path = require( "path" );
const common = require( "../../common.js" );

module.exports = function( app ) {
    console.log( "Loading home.html" );

    app.post( "/api/friends", function( req, res ) {
        console.dir( req.body );
        common.addData( req.body );
        common.saveData();
    })
}
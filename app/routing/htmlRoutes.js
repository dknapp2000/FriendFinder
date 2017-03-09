const path = require( "path" );

module.exports = function(app) {
    console.log( "Loading htmlRouts.html" );

    app.get( "/", function( req, res, next ) {
        var filePath = path.join( __dirname, "..", "public", "home.html" );
        console.log( "Sending file: " + filePath );
        res.sendFile( filePath );
    })
}
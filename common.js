const path = require( "path" );
const fs = require( "fs" );

module.exports = {
    loadData: function loadData() {
        const dataStore = path.join( __dirname, "app", "data", "datastore.js" );
        console.log( "Loadting data from " + dataStore );
        this.data = JSON.parse( fs.readFileSync( dataStore, "UTF8" ) );
        return this.data;
    },

    saveData: function saveData( ) {
        const dataStore = path.join( __dirname, "app", "data", "datastore.js" );
        console.log( "Saving data to " + dataStore );
        fs.writeFile( dataStore, JSON.stringify( this.data ), (err) => {
            if ( err ) throw err;
        })
    },
    getData() { return this.data },
    setData( contents ) { this.data = contents },
    addData( newPerson ) { 
        this.data.push( newPerson ) 
        this.saveData();
    }, 
    data: []
}
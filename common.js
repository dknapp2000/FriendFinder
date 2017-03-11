const path = require( "path" );
const fs = require( "fs" );
/* 
 * This module holds the routes for the common functions, mostly around the data , 
 */
module.exports = {

    // loadData grabs the data from the datastore.js file.  It's called at startup.
    loadData: function loadData() {
        const dataStore = path.join( __dirname, "app", "data", "datastore.js" );
        console.log( "Loadting data from " + dataStore );
        this.data = JSON.parse( fs.readFileSync( dataStore, "UTF8" ) );
        //console.log( this.data );
        return this.data;
    },

    // saveData pushes the updated data object back into datastore.js 
    saveData: function saveData( ) {
        const dataStore = path.join( __dirname, "app", "data", "datastore.js" );
        console.log( "Saving data to " + dataStore );
        fs.writeFile( dataStore, JSON.stringify( this.data ), (err) => {
            if ( err ) throw err;
        })
    },
    
    // Getter for the data
    getData: () => { return this.data },
    
    // setter for the data 
    setData: ( contents ) =>  { this.data = contents },

    // Add a new object (person) to the dataset 
    addData: ( newPerson ) => { 
        this.data.push( newPerson ) 
        this.saveData();
        console.log( this.data );
    }, 

    // The data. . .
    data: [],

    // Scan the existing list for closest match to the new person.
    findMatch: ( newEntry ) => {
        let list = this.data;
        let result = list.map( ( item ) => {
            let diff = 0;
            for ( let i=0; i<item.scores.length; i++ ) {
                diff += Math.abs( item.scores[i] - newEntry.scores[i] );
            } 
            return diff;
        })
        console.log( result );
    }
}
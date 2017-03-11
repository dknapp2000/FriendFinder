
module.exports = { 
    findMatch: ( newEntry, list ) => {
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
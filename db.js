

const sqlite3 = require("sqlite3").verbose();

// To database we need to open connection

const db = new sqlite3.Database("./loans.db", sqlite3.OPEN_READWRITE, (error)  => {
        if (error) {
                        console.log("Unable to connect database ")  
        } else {
                    console.log("Database is connected ")
        }
});

module.exports = db ;

      // Im exporting this db to index.js

/* Im exporting this db to index.js

 /*db.serialize( ()=> {
        
        // Get All Applications from loans table
        // SELECT * from loans;

     db.all(`Select * from loans`, (error,bdRow)=> {
        console.log(" :: Error ::", error),
        console.log(":: DBRow ::", bdRow)
      })   
} )

*/
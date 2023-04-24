

const sqlite3 = require("sqlite3").verbose();

// Manam (Database browser ) lo em name tho aithe create loans.db ani create chesamo adaye name ni new sqlite3.Database ki connect chesthunam 
// loans.db anaye database file ni, db.js nundi operate chesthunam  next
// db.js ni index.js ki export chesthunam

/*const db = new sqlite3.Database("./loans.db", function (error) {
        if(error) {
                console.error(error)   ========>>>> This will also work just ekada functionality change chesam anthe
        }
        console.log("DATABASE CONNECTED.....")
})*/

// To database we need to open connection // 

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
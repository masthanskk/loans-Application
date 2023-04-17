// 786

const express = require("express");        // ExpressJS to handle request body need to install (body-parser library )
const bodyParser = require("body-parser"); // Body Parser aneydhi manam json body format lo chupinchadaniki tesukuntam
const sqlite3 = require("sqlite3");


// db ni db.js ki connect chesina tharvatha aa db.js ni ekada import chesthunam.
const db = require("./db.js");

//To connecting Express app to Database by using ** const sqlite3 = require("sqlite3"); **


 // Creating an Express application
 const app = express();
 
 // Handle Json body request 
 app.use(bodyParser.json() );  // bodyParser ni JSON format lo chupistunam

 app.get('/', function (req,res) {
        res.json({
                status:true,
                Message : "Loan API running Sucessfull  "
        });
 });

 

// Get all loans applications
app.get("/loans", function (request, response) {

       db.serialize(function () {
          const Selectquery = `SELECT * from loans`
          db.all(Selectquery, (error, rows) => {
            if (error) {
               response.json({
                 status: false,
                 error: error
               })
             } else {
               response.json({
                 status: true,
                loans: rows
              })
            }
          })
        })
     })

// Post API for NEW Loan Application
// POST Api lo, manam postman lo insert chesina data ni tharvatha vs code lo request body handle cheyali,anduke const loandata = request.body


  app.post('/new-loan',(req,res) => {
     const loandata = req.body;


    //    const firstname = loandata.firstname;
    //    const lastname = loandata.lastname;
    //    const email = loandata.email;
    //    const loan_amount = loandata.loan_amount;
    //    const purpose = loandata.purpose

    //  You can do same thing using Destructing object
        const {firstname,lastname,email,amount,purpose } = loandata;



        if(!firstname){
              
          //    return  res.status(400).json({
          //              status : false,
          //              error : "Please provide firstname"
          //      });
                return senderrormessage(res, "Please provide firstname ")
        }


         if(!lastname){
           //   return res.status(400).json({
           //            status:false,
           //            error: "Please provide lastname"
           //     });
                 return senderrormessage(res,"Please provide lastname ");
        }      

         if(!email){
                return senderrormessage(res,"Please provide email")
         }

         if (!amount){
                return senderrormessage(res, "Please provide amount ")

         }

         if (!purpose){
                return senderrormessage(res, " Please provide purpose")
         }

       
     function senderrormessage (res , errormessage){
        res.status(400).json({
                status : false,
                error : errormessage
        })
     }    

        res.json({
                Status : true,
                Message : "New loan Application Creating . . ",
                data : loandata
        })
  });

 // app.listen(port,callback function)
 app.listen(3000, () => {
        console.log("API's Servers  Running On https://localhost:3000 ")
 })
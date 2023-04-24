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


  app.post('/new-loan',(request,response) => {
     const loandata = request.body;


    //    const firstname = loandata.firstname;
    //    const lastname = loandata.lastname;
    //    const email = loandata.email;
    //    const loan_amount = loandata.loan_amount;
    //    const purpose = loandata.purpose

    //  You can do same thing using Destructing object
        const {firstName,lastName,email,amount,purpose } = loandata;

        /* function senderrormessage (res , errormessage){
          res.status(400).json({
                  status : false,
                  error : errormessage
          })
          }  */        

        if(!firstName){
              
          //    return  res.status(400).json({
          //              status : false,
          //              error : "Please provide firstname"
          //      });
                return senderrormessage(res, "Please provide firstname ")
        };


         if(!lastName){
           //   return res.status(400).json({
           //            status:false,
           //            error: "Please provide lastname"
           //     });
                 return senderrormessage(res,"Please provide lastname ");
        };      

         if(!email){
                return senderrormessage(res,"Please provide email")
         };

         if (!amount){
                return senderrormessage(res, "Please provide amount ")

         };

         if (!purpose){
                return senderrormessage(res, " Please provide purpose")
         };
         
         
         const InsertSql = `INSERT INTO loans (
          firstName,
          lastName,
          email,
          loan_amount,
          purpose
       ) VALUES (
        "${firstName}",
        "${lastName}",
        "${email}",
        "${amount}",
        "${purpose}"
       )`
     db.serialize ( ()=> {
      db.exec(InsertSql,(error)=> {
        if (error) {
          response.status(400).json({
            status: false,
            error :error
          })
        } else { 
          response.json({
          status  : true,
          message : "New loan Application Created . . ",
        //  data : loandata,
        //   sql : InsertSql
         })
        }
      });
    });

         function senderrormessage (response , errormessage){
          response.status(400).json({
                  status : false,
                  error : errormessage
          })
     };    

    });

    app.get("/loans/:id",function (req,res){
      const loan_id = req.params.id;

      const sql = `SELECT * FROM loans WHERE loan_id=${loan_id}`
      db.serialize( ()=>{
        db.get(sql,(error,row) =>{ 
          if(error || !row){
            res.status(400).json({
              status : false,
              error:`UNABLE to find loan_id : ${loan_id}`
            })
          }else{
            res.json({
              status:true,
              loan:row
            })
          }
        })
      })
    });

    
     app.delete("/loans/:loanID", (req,res)=> {
      const loan_ID = req.params.loanID;
       const sql = `Delete from loans where loan_ID = ${loan_ID}`
        
        db.serialize( ()=>{
          db.exec(sql, error =>{
            if(error){
              res.status(400).json({
                status:false,
                error: "Can't delete the loan"
              })
            } else{
              res.json({
                status: true,
                message: "Loan Deleted Succefully"
              })
            }
          })
        })
     })  


 // app.listen(port,callback function)
 app.listen(3000, () => {
        console.log("API's Servers  Running On https://localhost:3000 ")
 })
// 786

const express = require("express");        // ExpressJS to handle request body need to install (body-parser library )

const bodyParser = require("body-parser");

// Creating an Express application
 const app = express();
 
 // Handle Json body request 
 app.use(bodyParser.json() );

 app.get('/', function (req,res) {
        res.json({
                status:true,
                Message : "Loan API running Sucessfull  "
        })
 });

// Post API for NEW Loan Application
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
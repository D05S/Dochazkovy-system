const express = require("express");
const bodyParser = require ("body-parser");
const http = require ("http");
const axios = require ("axios");



// User information from form

let userInputNumber = " -- : -- ";
let userInputName = " -- : -- ";
let userInputClass = " -- : -- ";

// for time table generate, days, presence !

let numberOfDays = "";
let presenceInfo = " -- : -- ";

// for souhrn info 

let overTime = " hh:hh ";
let holidayTime = " dd ";
let medicalVisits = " dd ";
let workDays = " dd ";
let remainingDays = " dd ";

let userInformation = [];


const app = express();


app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));






app.get("/", function(req, res){

     let today = new Date();

     let options = {
         weekday: "long",
         day: "numeric",
         month: "long",
     };

     let day = today.toLocaleDateString("cz-CZ", options);

    
   
    
        
          
        
    

     res.render("list", { 

         // Time
         dateOfDay: day, 

         // user Info
         userNumber: userInputNumber, 
         userName: userInputName, 
         userClass: userInputClass, 

         // presence Info
         month: numberOfDays,
         presenceShow: presenceInfo,
        
         // Souhrn Info
         overTimeShow: overTime,
         holidayTimeShow: holidayTime,
         medicalVisitsShow: medicalVisits,
         workDaysShow: workDays,
         remainingDaysShow: remainingDays,
     });
 });


app.post("/", function(req, res){

     userInputNumber = req.body.userNumber;
     userInputName = req.body.userName;
     userInputClass = req.body.userDepartment;


     let userNumberPost = userInputNumber;
     let userNamePost = userInputName;
     let userClassPost = userInputClass;

    //  const url = "http://127.0.0.1:8000/api/test"

    let osobniId = userInputNumber;
    //  const urlApi = "file://fs1.intranet.fpc.cz/vis/soubory2/" + osobniId + "/vykaz1.html"

    // http://app1.intranet.fpc.cz/doch/105/vykaz1.html

    const urlApi = "http://127.0.0.1:8000/api/test?pathInfo=file://fs1.intranet.fpc.cz/vis/soubory2/" + osobniId + "/vykaz1.html&nameOfUser=" + userNamePost + "&number=" + userNumberPost + "&department=" + userClassPost

    

     http.get(urlApi, function(response){

         console.log(response.statusCode);

         response.on("data", function(data){
            
             const apiData = JSON.parse(data);
             const mainInfo = apiData.data;
             const presence = mainInfo.times;

             
             // presence Info
             numberOfDays = presence.length;
             presenceInfo = presence;
            
            
             // for souhrn

             overTime = mainInfo.prescas;
             holidayTime = mainInfo.dovolena;
             medicalVisits = mainInfo.lekar;
             workDays = mainInfo.pracovnichDnuCelkem;
             remainingDays = mainInfo.odpracovanoDnu;


             // for info only
            

             console.log( " --- informace ---");
             console.log(mainInfo);
             console.log(mainInfo.times);

             userInformation.push(userInputNumber, userInputName, urlApi);
             console.log(userInformation);
             console.log(urlAPi);
            
         })


         res.redirect("/");
        
     });

    //  axios.post("http://127.0.0.1:8000/api/test", {
    //     number: userInputNumber,
    //     nameOfUser: userInputName,
    //     department: userInputClass,
    //     pathInfo: urlApi
    //   })
    //   .then((response) => {
    //     console.log(number);
    //   }, (error) => {
    //     console.log(error);
    // });
    

});





app.listen(3030, function(){
    console.log(" --- Server is running | Port 3030 ---")

});
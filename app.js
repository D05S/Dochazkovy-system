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
     });
});



app.get("/:personalWork", function(req, res){

    let today = new Date();

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    let day = today.toLocaleDateString("cz-CZ", options);

   
    res.render("personalWork", { 

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

     let osobniId = userInputNumber;

    // http://app1.intranet.fpc.cz/doch/105/vykaz1.html

    const urlApi = "http://127.0.0.1:8000/api/test?pathInfo=file://fs1.intranet.fpc.cz/vis/soubory2/" + osobniId + "/vykaz1.html&nameOfUser=" + userNamePost + "&number=" + userNumberPost + "&department=" + userClassPost;

    

    // const api = {
    //     host: "127.0.0.1",
    //     port: 8000,
    //     path: "/api/test?pathInfo=file://fs1.intranet.fpc.cz/vis/soubory2/" + osobniId + "/vykaz1.html&nameOfUser=" + userNamePost + "&number=" + userNumberPost + "&department=" + userClassPost
    // }

    http.get(urlApi, function(response){

        console.log(response.statusCode);

        response.on("data", function(err,data){

            if (err) {

                console.log("--- Error ---");
                console.log(err);
               

            } else {

                console.log( "--- OK ---");
                console.log(" --- Continue ---");
                
                
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
            
            };
            
            
         });


        // for info only
                
        userInformation.push(userInputNumber + " - " + userInputName);

        console.log( " --- informace ---");
        console.log(userInformation);
        console.log("Počet uživatlů | " + userInformation.length);
        

        console.log(" --- hlavni informace ---");
        console.log(mainInfo);
        console.log(mainInfo.times);

        const personalWork = "dochazkaUzivatele" + userInputNumber + "&" + userInputName + "madyByDominikSauer";

        res.redirect("/" + personalWork);
        
     });


});





app.listen(8080, function(){
    console.log(" --- Server is running | Port 8080 ---")

});
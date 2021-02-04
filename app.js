const express = require("express");
const bodyParser = require ("body-parser");
const http = require ("http");



// User information from form

let userInputNumber = " -- : -- ";
let userInputName = " -- : -- ";
let userInputClass = " -- : -- ";

// for time table generation, days, presence !

let numberOfDays = "";
let dateInfo = " -- : -- ";
let dayInfo = " -- : -- ";
let arrivalInfo = " -- : --";
let leaveInfo = " -- : -- ";
let workHoursInfo = " -- : -- ";
let noteInfo = " -- : -- ";


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
        dateInfoShow: dateInfo,
        dayInfoShow: dayInfo,
        arrivalInfoShow: arrivalInfo,
        leaveInfoShow: leaveInfo,
        workHoursInfoShow: workHoursInfo,
        noteInfoShow: noteInfo,

        

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

    const url = "http://127.0.0.1:8000/api/test"

    let osobniId = userInputNumber;
    const urlApi = "file://fs1.intranet.fpc.cz/vis/soubory2/" + osobniId + "/vykaz1.html"

    http.get(url, function(response){

        console.log(response.statusCode);

        response.on("data", function(data){
            
            const apiData = JSON.parse(data)
            const mainInfo = apiData.data;
            const presence = mainInfo.times;


            // presence Info
            numberOfDays = presence.length;
            
            

                dateInfo = presence[0].date;
                dayInfo = presence[0].day;
                arrivalInfo = presence[0].start;
                leaveInfo = presence[0].end;
                workHoursInfo = presence[0].time;
                noteInfo = presence[0].reason;

            
            

            // for souhrn

            overTime = mainInfo.prescas;
            holidayTime = mainInfo.dovolena;
            medicalVisits = mainInfo.lekar;
            workDays = mainInfo.pracovnichDnuCelkem;
            remainingDays = mainInfo.odpracovanoDnu;


            // for info only
            

            
            
            userInformation.push(userInputNumber, userInputName, urlApi);
            console.log(userInformation);

            
        })

        
        res.redirect("/");
        
    });

});





app.listen(3030, function(){
    console.log(" --- Server is running | Port 3030 ---")

});
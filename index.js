let informationAboutUser = [];


function userInputInformation(){

    var osobniCislo = $("#userId").val();
    var jmenoPracovnika = $("#userName").val();
    var pracovniOddeleni = $("#userDepartment").val();
    const urlInput = "URL;file://fs1.intranet.fpc.cz/vis/soubory2/" + $("#userId").val() + "/vykaz1.html";

   

    async function getData(){
      const response = await fetch("http://127.0.0.1:8000/api/test");
      const apiData = await response.json();

      
      $("#overTime").text(apiData.data.prescas);
      $("#holiday").text(apiData.data.dovolena);
      $("#medicVisit").text(apiData.data.lekar);
      $("#workDaysThisMonth").text(apiData.data.pracovnichDnuCelkem);
      $("#workDaysAcomplish").text(apiData.data.odpracovanoDnu);

      for (var i = 0; i<31; i++){

      $("#" + i + "_1").text( apiData.data.times[i].date);
      $("#" + i + "_2").text( apiData.data.times[i].day);
      $("#" + i + "_3").text( apiData.data.times[i].start);
      $("#" + i + "_4").text( apiData.data.times[i].end);
      $("#" + i + "_5").text( apiData.data.times[i].time);
      $("#" + i + "_6").text( apiData.data.times[i].reason);

     
      }
    }

    getData();

    


    
    $("#numberInfo").text(osobniCislo);
    $("#nameInfo").text(jmenoPracovnika);
    $("#departmentInfo").text(pracovniOddeleni);

    informationAboutUser.push(osobniCislo);
    informationAboutUser.push(jmenoPracovnika);
    informationAboutUser.push(pracovniOddeleni);
    informationAboutUser.push(urlInput);

    

    
    
    console.log(informationAboutUser);

}

let informationAboutUser = [];




function userInputInformation(){

    var osobniCislo = $("#userId").val();
    var jmenoPracovnika = $("#userName").val();
    var pracovniOddeleni = $("#userDepartment").val();
    var urlInput = "URL;file://fs1.intranet.fpc.cz/vis/soubory2/" + $("#userId").val() + "/vykaz1.html";
    
    $("#numberInfo").text(osobniCislo);
    $("#nameInfo").text(jmenoPracovnika);
    $("#departmentInfo").text(pracovniOddeleni);

    informationAboutUser.push(osobniCislo);
    informationAboutUser.push(jmenoPracovnika);
    informationAboutUser.push(pracovniOddeleni);
    informationAboutUser.push(urlInput);



    
    
    console.log(informationAboutUser);
    
    
}



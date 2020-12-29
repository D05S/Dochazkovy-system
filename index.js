


function showInfo(){

    var osobniCislo = document.getElementById("personalId").value;

    document.getElementById("numberInfo").innerText = osobniCislo;

    var jmenoP = document.getElementById("jmenoPrijimeni").value;

    document.getElementById("nameInfo").innerText = jmenoP;

    var department = document.getElementById("workingPlace").value;

    document.getElementById("departmentInfo").innerText = department;
    
    var userInfo = [osobniCislo, jmenoP, department];

    console.log(userInfo);
    

}









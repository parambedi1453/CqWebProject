var uppdatebtn = document.getElementById("updateButton");
uppdatebtn.onclick = function()
{
    var uemail = document.getElementById("pusername");
    var uname = document.getElementById("pname");
    var udob = document.getElementById("pdob");
    var ugender = document.getElementById("pgender");
    var uphone = document.getElementById("pphone");
    var ucity = document.getElementById("pcity");
    var uinterset = document.getElementById("pinterest");
    var ujourney = document.getElementById("pjourney");
    var uexpec = document.getElementById("pexpectations");

    var ob = new Object();
    ob.email = uemail.value;
    ob.name = uname.value;
    ob.dob = udob.value;
    ob.gender = ugender.value;
    ob.phone = uphone.value;
    ob.city = ucity.value;
    ob.interest = uinterset.value;
    ob.journey = ujourney.value;
    ob.expectations = uexpec.value;
    ob.isupdate = "1";

    var request = new XMLHttpRequest();
    var filename = '/editProfile';
    request.open('POST',filename);
    request.setRequestHeader("content-Type","application/JSON");
    request.send(JSON.stringify(ob));
    request.onload = function()
    {
        console.log(request.responseText);
        window.location = '/userProfile';
    }

}
//LOGOUT YES BUTTON ONCLICk
function gotologinpage()
{
    window.location = '/exit'
}

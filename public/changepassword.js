var colorLi = document.getElementById("sidebar-password");
colorLi.setAttribute("style","background-color:#337ab7;");


var bttn = document.getElementById("submitbtn");
bttn.onclick = function()
{
    var oldp = document.getElementById("oldpassword");
    var newp = document.getElementById("newpassword");

    var passob = new Object();
    passob.oldp = oldp.value;
    passob.newp = newp.value;


    var request = new XMLHttpRequest();
    var filename = '/editpassword';
    request.open('POST',filename);
    request.setRequestHeader("content-Type","application/JSON");
    request.send(JSON.stringify(passob));
    request.onload = function()
    {
        console.log(request.responseText);
    }

}

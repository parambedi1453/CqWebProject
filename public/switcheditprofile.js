var sidebaruser = document.getElementById("sidebar-user");
var sidebarusers = document.getElementById("sidebar-users");
var switchuser = document.getElementById("sidebar-switchuser");
var sidebarhome = document.getElementById("sidebar-home");
var sidebaradd = document.getElementById("sidebar-add");
var sidebarlist =  document.getElementById("sidebar-list");
var sidebarcomm = document.getElementById("sidebar-comm");
var sidebaradmin =  document.getElementById("sidebar-admin");
var sidebartag =  document.getElementById("sidebar-tag");
var sidebarchangepass = document.getElementById("sidebar-password");
var sidebarchangepass2 = document.getElementById("sidebar-password2");

sidebarchangepass2.setAttribute("style","display:block");
sidebarchangepass.setAttribute("style","display:none");

sidebaruser.setAttribute("style","display:block");
sidebarusers.setAttribute("style","display:block");
sidebar-switchuser.setAttribute("style","display:block");
sidebarhome.setAttribute("style","display:none");
sidebaradd.setAttribute("style","display:none");
sidebarlist.setAttribute("style","display:none");
sidebarcomm.setAttribute("style","display:none");
sidebaradmin.setAttribute("style","display:none");
sidebartag.setAttribute("style","display:none");



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

    var request = new XMLHttpRequest();
    var filename = '/editProfile';
    request.open('POST',filename);
    request.setRequestHeader("content-Type","application/JSON");
    request.send(JSON.stringify(ob));
    request.onload = function()
    {
        console.log(request.responseText);
    }

}

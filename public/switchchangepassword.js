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


/****************************/
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

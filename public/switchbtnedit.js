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

function gotoupdatepage()
{
    window.location = "/switcheditProfile";
}

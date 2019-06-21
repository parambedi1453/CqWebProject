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







//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var createCommbtn = document.getElementById("createCommbtn");

function getMonths(monthno)
  {
    var month=["Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return month[monthno-1];
  }




function submitCommunity(creator,idd)
{

    var clickday = new Date();
    var dd = clickday.getDate();
    var mm = clickday.getMonth();
    var yyyy = clickday.getFullYear();
    var hrs = clickday.getHours();
    var mins = clickday.getMinutes();
    var format = "AM";
    if(hrs>12)
    {
        hrs = hrs-12;
        format="PM";
    }
    clickday = + dd + '-' + getMonths(mm) + '-' + yyyy;
    clickday = clickday + " ( " + hrs + ':' + mins + ' ' + format + " )";
    console.log(clickday);

    var name = document.getElementById("commName");
    var desc = document.getElementById("descArea");
    var rule1 = document.getElementById("commRule1");
    var rule2 = document.getElementById("commRule2");



    var ob = new Object()
    ob.commname = name.value;
    ob.commdesc = desc.value;
    if(rule1.checked)
    ob.commrule = rule1.value;
    else {
        ob.commrule = rule2.value;
    }
    ob.commlocation = "Not Added";
    ob.commowner = creator;
    ob.commdate = clickday;
    ob.memberno = 1;
    ob.ownerid = idd;
    ob.commstatus ="1";
    var request = new XMLHttpRequest();
    var filename = '/createcomm';
    request.open('POST',filename);
    request.setRequestHeader("content-Type","application/JSON");
    request.send(JSON.stringify(ob));
    request.onload = function()
    {
        console.log(request.responseText);

    }
}

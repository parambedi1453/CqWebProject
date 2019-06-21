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




//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var searchbtn = document.getElementById("search-btn");
searchbtn.onclick = function()
{
    window.location = '/userSearchswicth';
}
var firstbtn = document.getElementById("first-btn");
firstbtn.onclick = function()
{
    window.location = '/usercommpageswitch';
}



var bigDiv = document.getElementById("bigDiv");

loadFromServer();


function loadFromServer()
{


    var filename = '/getCommunityforSearch';
    var request = new XMLHttpRequest();
    request.open('GET',filename);
    request.send();
    request.onload = function()
    {
        commArr = JSON.parse(request.responseText);
        console.log(commArr);

        for(var i in commArr)
        {

            addToDom(commArr[i]);
        }
    }
}
function addToDom(ob)
{

    console.log(ob);

    var parentDiv = document.createElement("div");
    parentDiv.setAttribute("class","container");

    var wrapperdiv =  document.createElement("div");
    wrapperdiv.setAttribute("class","panel panel-default");
    wrapperdiv.setAttribute("style","    box-shadow: 0 3px 10px 0 rgba(115,143,147,.3);")

    var div1 = document.createElement("div");
    div1.setAttribute("class","panel-body");
    div1.setAttribute("style","padding:0;padding-top:20px");

    var div11 = document.createElement("div");
    div11.setAttribute("class","col-sm-2 col-xs-3 col-lg-1 col-md-2");
    var img = document.createElement("img");
    img.setAttribute("src","defaultcomm.png");
    img.setAttribute("style","height: 50px;width: 50px;border: 3px solid #fff;background: rgb(255, 255, 255) !important;box-shadow: 0 0 10px rgba(0,0,0,0.5);")
    div11.appendChild(img);
    div1.appendChild(div11);


    var div12 = document.createElement("div");
    div12.setAttribute("class","col-sm-8 col-xs-6 col-lg-8 col-md-8");
    var a12 = document.createElement("a");
    a12.setAttribute("onclick","goToCommProfile()");
    a12.setAttribute("href","/communityProfilePageSwitch/"+ob._id);
    a12.innerHTML = ob.commname;
    div12.appendChild(a12);
    div1.appendChild(div12);

    var div13 = document.createElement("div");
    div13.setAttribute("class","col-sm-2 col-xs-3 col-lg-3 col-md-2");
    div13.setAttribute("style","padding:15px 10px 0px 10px");
    var div131 = document.createElement("div");
    var btn = document.createElement("button");
    btn.setAttribute("class","btn btn-primary btn-sm pull-right");
    btn.setAttribute("onclick","joinBtnFunc()")
    if(ob.commrule=="d")
    btn.innerHTML = "JOIN";
    else if(ob.commrule=="p"){
        btn.innerHTML = "ASK TO JOIN";
    }
    div131.appendChild(btn);
    div13.appendChild(div131);
    div1.appendChild(div13);


    //BUTTON FUNCTIONING
    btn.onclick = function()
    {
        var request = new XMLHttpRequest();
        var filename = '/joinbtnclick';
        request.open('POST',filename);
        request.setRequestHeader("content-Type","application/JSON");
        request.send(JSON.stringify(ob));
        request.onload = function()
        {
            console.log(request.responseText);

        }
        parentDiv.removeChild(wrapperdiv);
    }


    wrapperdiv.appendChild(div1);

    var div2 = document.createElement("div");
    div2.setAttribute("class","panel-body");
    div2.setAttribute("style","padding:10px 0 10px 0");

    var div21 = document.createElement("div");
    div21.setAttribute("class","col-sm-12 col-xs-12 col-lg-12 col-md-12");
    var p21 = document.createElement("p");
    p21.setAttribute("id","memeberpara");
    p21.innerHTML = ob.memberno;
    div21.appendChild(p21);
    div2.appendChild(div21);

    var div22 = document.createElement("div");
    div22.setAttribute("class","col-sm-12 col-xs-12 col-lg-12 col-md-12");
    var p22 = document.createElement("p");
    p22.setAttribute("id","descpara");
    p22.innerHTML = ob.commdesc;
    div22.appendChild(p22);
    div2.appendChild(div22);


    wrapperdiv.appendChild(div1);
    wrapperdiv.appendChild(div2);

    parentDiv.appendChild(wrapperdiv);
    bigDiv.appendChild(parentDiv);

}
// function goToCommProfile()
// {
//     window.location ="/communityProfilePage";
// }


document.getElementById('searchinput').onkeyup=function()
{
    document.getElementById('bigDiv').innerHTML=""
    var val=document.getElementById('searchinput').value;
    console.log(val)
    for(j in commArr)
    {
        if((commArr[j].commname).includes(val))
        {
             console.log("inSEARCHFUNCTION")
           // console.log(commArr[j])
            addToDom(commArr[j]);
        }
    }
}


var parentDiv = document.getElementById("listOfUMRI");
var smallParent = document.getElementById("rowAppend");
var ausers = document.getElementById("ausers");
var amanager = document.getElementById("amanager");
var arequest = document.getElementById("arequest");
var ainvite = document.getElementById("ainvite");

var joinArr = [];
var askjoinArr = [];
var inviteArr = [];

getCommunityDetails();

function getCommunityDetails()
{
    var getid = document.getElementById("getCommId").innerHTML;
    var ob  = new Object();
    ob.id = getid;
    var request = new XMLHttpRequest();
    var filename = '/getcommdetails';
    request.open('POST',filename);
    request.setRequestHeader("content-Type","application/JSON");
    request.send(JSON.stringify(ob));
    request.onload = function()
    {
        var obj = JSON.parse(request.responseText);
        console.log(obj);

        //BY default Page will Have USERS
        for(var i in obj.commjoin)
        {
            console.log("gfhkj")
            addToDom(obj.commjoin[i]);
        }

        ausers.onclick = function()
        {
            smallParent.innerHTML = "";
            for(var i in obj.commjoin)
            {
                console.log("gfhkj")
                addToDom(obj.commjoin[i]);
            }
        }
        arequest.onclick = function()
        {
            smallParent.innerHTML = "";
            for(var i in obj.commasktojoin)
            {
                console.log("gfhkj")
                addToDom2(obj.commasktojoin[i]);
            }
        }
        amanager.onclick = function()
        {
            smallParent.innerHTML = "";
            console.log(obj.ownerid);
            addToDom3(obj.ownerid);
        }

    }

}
function addToDom(ob)
{
    var div1 = document.createElement("div");
    div1.setAttribute("class","col-sm-12 col-xs-12");
    div1.setAttribute("style","border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;margin-top:5px");


    var div11 = document.createElement("div");
    div11.setAttribute("class","col-sm-2 col-xs-3");
    div11.setAttribute("style","padding:5px");
    var a11 = document.createElement("a");
    a11.setAttribute("href","#");
    var img11 = document.createElement("img");
    img11.setAttribute("src",ob.photoname);
    img11.setAttribute("style","height: 50px;width: 50px;border: 3px solid #fff;border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.5)")
    a11.appendChild(img11);
    div11.appendChild(a11);
    div1.appendChild(div11);


    var div12 = document.createElement("div");
    div12.setAttribute("class","col-sm-8 col-xs-6");
    var a12 = document.createElement("a");
    a12.setAttribute("href","#");
    a12.setAttribute("style","margin-top: 20px;font-weight: bold;font-size: 18px; display: inline-block;text-transform: capitalize;cursor: pointer;color: #337ab7;");
    a12.innerHTML = ob.name;
    div12.appendChild(a12);
    div1.appendChild(div12);


    var div13 = document.createElement("div");
    div13.setAttribute("class","col-sm-2 col-xs-3");
    a13 = document.createElement("a");
    a13.setAttribute("style","float:left;margin-top: 20px;color: #7D7D7D;font-size: 20px;text-decoration: none;text-transform: capitalize;");
    i13 = document.createElement("i");
    i13.setAttribute("class","fa fa-chevron-up");
    a13.appendChild(i13);
    div13.appendChild(a13);

    a14 = document.createElement("a");
    a14.setAttribute("style","float:right;margin-top: 20px;color: #7D7D7D;font-size: 20px;text-decoration: none;text-transform: capitalize;");
    i14 = document.createElement("i");
    i14.setAttribute("class","fa fa-times");
    a14.appendChild(i14);
    a14.appendChild(i14);
    div13.appendChild(a14);

    div1.appendChild(div13);

    smallParent.appendChild(div1);

}


function addToDom2(ob)
{
    var div1 = document.createElement("div");
    div1.setAttribute("class","col-sm-12 col-xs-12");
    div1.setAttribute("style","border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;margin-top:5px");


    var div11 = document.createElement("div");
    div11.setAttribute("class","col-sm-2 col-xs-3");
    div11.setAttribute("style","padding:5px");
    var a11 = document.createElement("a");
    a11.setAttribute("href","#");
    var img11 = document.createElement("img");
    img11.setAttribute("src",ob.photoname);
    img11.setAttribute("style","height: 50px;width: 50px;border: 3px solid #fff;border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.5)")
    a11.appendChild(img11);
    div11.appendChild(a11);
    div1.appendChild(div11);


    var div12 = document.createElement("div");
    div12.setAttribute("class","col-sm-8 col-xs-6");
    var a12 = document.createElement("a");
    a12.setAttribute("href","#");
    a12.setAttribute("style","margin-top: 20px;font-weight: bold;font-size: 18px; display: inline-block;text-transform: capitalize;cursor: pointer;color: #337ab7;");
    a12.innerHTML = ob.name;
    div12.appendChild(a12);
    div1.appendChild(div12);


    var div13 = document.createElement("div");
    div13.setAttribute("class","col-sm-2 col-xs-3");
    b13 = document.createElement("button");
    b13.setAttribute("class","btn btn-default");
    b13.setAttribute("style","float:right;margin-top:15px;");
    b13.innerHTML = "Option"

    div13.appendChild(b13);

    div1.appendChild(div13);

    smallParent.appendChild(div1);

}
function addToDom3(ob)
{
    console.log(ob.name);

    var div1 = document.createElement("div");
    div1.setAttribute("class","col-sm-12 col-xs-12");
    div1.setAttribute("style","border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;margin-top:5px");


    var div11 = document.createElement("div");
    div11.setAttribute("class","col-sm-2 col-xs-3");
    div11.setAttribute("style","padding:5px");
    var a11 = document.createElement("a");
    a11.setAttribute("href","#");
    var img11 = document.createElement("img");
    img11.setAttribute("src",ob.photoname);
    img11.setAttribute("style","height: 50px;width: 50px;border: 3px solid #fff;border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.5)")
    a11.appendChild(img11);
    div11.appendChild(a11);
    div1.appendChild(div11);


    var div12 = document.createElement("div");
    div12.setAttribute("class","col-sm-8 col-xs-6");
    var a12 = document.createElement("a");
    a12.setAttribute("href","#");
    a12.setAttribute("style","margin-top: 20px;font-weight: bold;font-size: 18px; display: inline-block;text-transform: capitalize;cursor: pointer;color: #337ab7;");
    a12.innerHTML = ob.name;
    div12.appendChild(a12);
    div1.appendChild(div12);


    var div13 = document.createElement("div");
    div13.setAttribute("class","col-sm-2 col-xs-3");
    span = document.createElement("span");
    span.setAttribute("class","label label-success");
    span.setAttribute("style","margin-top:25px;float:right");
    span.innerHTML = "Owner";
    div13.appendChild(span);

    div1.appendChild(div13);

    smallParent.appendChild(div1);
}

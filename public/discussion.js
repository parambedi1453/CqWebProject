var parent = document.getElementById("discussionList");


loadFromServer();

var Arr = [];
function loadFromServer()
{
    var getCommid = document.getElementById("getId").innerHTML;
    var ob = new Object();
    ob.id = getCommid;
    var request = new XMLHttpRequest();
    var filename = '/getCommDiscusions';
    request.open('POST',filename);
    request.setRequestHeader("content-Type","application/JSON");
    request.send(JSON.stringify(ob));
    request.onload = function()
    {
        //console.log(request.responseText);
        var obj = JSON.parse(request.responseText);
         console.log(obj);
        //console.log(obj.commdiscussion);
        for(var i in obj.commdiscussion)
        {
            // console.log(obj.commdiscussion[i])
            addToDom(obj.commdiscussion[i]);
        }

    }

}


function addToDom(ob)
{

    var maindiv  = document.createElement("div");
    maindiv.setAttribute("class","container");
    maindiv.setAttribute("style","padding : 0 20px 0 20px");
    var  div1 = document.createElement("div");
    div1.setAttribute("class","panel panel-default");
    div1.setAttribute("style","background:white; box-shadow:0 3px 10px 0 rgba(115,143,147,.3)");


    var dropdiv = document.createElement("div");
    dropdiv.setAttribute("class","dropup");
    var dropupbtn = document.createElement("a");
    dropupbtn.setAttribute("class","dropupbtn");
    dropupbtn.setAttribute("style","float:right ! important");
    var i1 = document.createElement("i");
    i1.setAttribute("class","fa fa-ellipsis-h");
    dropupbtn.appendChild(i1);

    var contentdiv = document.createElement("div");
    contentdiv.setAttribute("class","dropup-content");
    var ad1 = document.createElement("a");
    ad1.innerHTML = "Delete";
    var ad2 = document.createElement("a");
    ad2.innerHTML = "Feature";
    var ad3 = document.createElement("a");
    ad3.innerHTML = "Publish";
    contentdiv.appendChild(ad1);
    contentdiv.appendChild(ad2);
    contentdiv.appendChild(ad3);
    dropdiv.appendChild(dropupbtn);
    dropdiv.appendChild(contentdiv);

    div1.appendChild(dropdiv);



    var div11 = document.createElement("div");
    div11.setAttribute("class","panel-body");
    div11.setAttribute("style","padding:0;pading-top:10px;");
    var div111 = document.createElement("div");
    div111.setAttribute("class","col-sm-12 col-xs-12 col-lg-12 col-md-12");
    div111.setAttribute("style","border: 0;font-family: 'Open Sans', sans-serif;font-weight: bold;word-wrap: break-word; font-size: 20px;outline: none !important;background-color: rgba(0, 0, 0, 0)");
    var a111 = document.createElement("a");
    a111.setAttribute("href","#");
    a111.setAttribute("style","border: 0;font-family: 'Open Sans', sans-serif;font-weight: bold;word-wrap: break-word; font-size: 20px;outline: none !important;background-color: rgba(0, 0, 0, 0)");
    a111.innerHTML = ob.dtitle;
    div111.appendChild(a111);
    div11.appendChild(div111);

    var div112 = document.createElement("div");
    div112.setAttribute("class","col-sm-12 col-xs-12 col-lg-12 col-md-12");
    div112.setAttribute("style","border: 0;font-family: 'Open Sans', sans-serif;font-weight: 600;word-wrap: break-word;font-size: 12px;margin: 5px auto 10px auto;outline: none !important;background-color: rgba(0, 0, 0, 0)");
    var a112 = document.createElement("a");
    a112.setAttribute("href","#");
    a112.innerHTML = "posted by "+ob.pname+" on "+ob.dday;
    div112.appendChild(a112);
    div11.appendChild(div112);

    div1.appendChild(div11);


    var div12 = document.createElement("div");
    div12.setAttribute("class","panel-body");
    div12.setAttribute("style","padding:0;pading-top:10px;");
    var div121 = document.createElement("div");
    div121.setAttribute("class","col-sm-12 col-xs-12 col-lg-12 col-md-12");
    div121.setAttribute("style","border: 0;font-family: 'Open Sans', sans-serif; word-wrap: break-word;font-size: 16px;color: #000;outline: none !important;background-color: rgba(0, 0, 0, 0)");
    div121.innerHTML = ob.ddetail;
    div12.appendChild(div121);
    div1.appendChild(div12);


    var div13 = document.createElement("div");
    div13.setAttribute("class","panel-body");
    div13.setAttribute("style","padding:0;pading-top:10px;");
    var div131 = document.createElement("div");
    div131.setAttribute("class","col-sm-4 col-xs-8 col-lg-2 col-md-3");
    var a131 = document.createElement("a");
    a131.setAttribute("style","font-size: 13px;font-weight: bold;color: rgb(139, 139, 139)");
    var i = document.createElement("i");
    i.setAttribute("class","fa fa-comment-alt");
    a131.innerHTML = "0    ";
    a131.appendChild(i);
    div131.appendChild(a131);
    div13.appendChild(div131);
    div1.appendChild(div13);

    maindiv.appendChild(div1);
    parent.appendChild(maindiv);



}
function getMonths(monthno)
  {
    var month=["Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return month[monthno-1];
  }
var postbtn = document.getElementById("discussionPost");
postbtn.onclick = function()
{

    //DATE
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
    // clickday = clickday + " ( " + hrs + ':' + mins + ' ' + format + " )";
    console.log(clickday);
    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    var getCommid = document.getElementById("getId").innerHTML;
    var title = document.getElementById("discussionTitle").value;
    var detail = document.getElementById("discussionDetails").value;
    var pname = document.getElementById("pname").innerHTML;//PERSON DETAILS
    var pid = document.getElementById("pid").innerHTML;//PersonID
    var ob = new Object();
    ob.id = getCommid;
    ob.dicussiontitle = title;
    ob.discussiondetail = detail;
    ob.pname = pname;
    ob.pid = pid;
    ob.day = clickday;
    var request = new XMLHttpRequest();
    var filename = '/enterCommDiscusions';
    request.open('POST',filename);
    request.setRequestHeader("content-Type","application/JSON");
    request.send(JSON.stringify(ob));
    request.onload = function()
    {
        console.log(request.responseText);
    }

}

var createBtn = document.getElementById("createBtn");
createBtn.onclick = function()
{
    window.location = '/addCommunity';
}
var sbtn = document.getElementById("search-btn");
sbtn.onclick = function()
{
    console.log("--------------------++++++++++++++++++++")
    window.location = '/userSearch';
}
var firstbtn = document.getElementById("first-btn");
firstbtn.onclick = function()
{
    window.location = '/usercommpage';
}

var commArr = [];
var panelBody = document.getElementById("panelBody");
loadFromServer();

function loadFromServer()
{
    var temp = document.getElementById("getuserId");
    temp = temp.textContent;
    //console.log(getuserId);
    var filename = '/getCommunityforUser';
    var request = new XMLHttpRequest();
    request.open('GET',filename);
    request.send();
    request.onload = function()
    {
        commArr = JSON.parse(request.responseText);
        //console.log(commArr);
        console.log(temp)
        for(var i in commArr)
        {
            console.log(commArr[i].ownerid)
            if(commArr[i].ownerid==temp)
            addDom(commArr[i]);
            else if(commArr[i].commrule == "d")
            addDom2(commArr[i]);
            else if(commArr[i].commrule == "p")
            addDom3(commArr[i]);
        }
    }
}
function addhr(target)
{
    var hr = document.createElement("hr");
    hr.setAttribute("style","color:black;border-width: 1px;")
    target.appendChild(hr);
}
function addDom(ob)
{
    //console.log(ob);
    var firstDiv = document.getElementById("firstDiv");

    var parentDiv = document.createElement("div");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    //var div4 = document.createElement("div");
    parentDiv.setAttribute("class","col-sm-12 col-xs-12");
    parentDiv.setAttribute("style","margin-top:5px");

    addhr(parentDiv);

    div1.setAttribute("class","col-sm-1 col-xs-3");
    div1.setAttribute("style","padding:10px");
    var img = document.createElement("img");
    img.setAttribute("src","defaultcomm.png");
    img.setAttribute("style","height: 50px;width: 50px;border: 3px solid #fff;background: rgb(255, 255, 255) !important;box-shadow: 0 0 10px rgba(0,0,0,0.5);")
    div1.appendChild(img);
    parentDiv.appendChild(div1);


    div2.setAttribute("class","col-sm-10 col-xs-7");
    div2.setAttribute("style","padding-top:25px;padding-bottom:5px;");
    var para = document.createElement("p");
    var a1 = document.createElement("a");
    a1.innerHTML = ob.commname;
    a1.setAttribute("href","/discussionPage/"+ob._id);
    var a2 = document.createElement("a");
    a2.setAttribute("style","margin-left:5px;")
    a2.innerHTML = "Requests(0)";
    para.appendChild(a1);
    para.appendChild(a2);
    div2.appendChild(para);
    parentDiv.appendChild(div2);

    div3.setAttribute("class","col-sm-1 col-xs-2");
    div3.setAttribute("style","padding-top:0px");
    var a3 = document.createElement("a");
    //a3.setAttribute("class","community-short-btn");
    a3.setAttribute("style","float:right");
    a3.setAttribute("href","/settingsPage/"+ob._id);
    var label = document.createElement("label");
    label.setAttribute("class","label label-success");
    var i1 = document.createElement("i");
    i1.setAttribute("class","fa fa-cogs");
    label.appendChild(i1);
    a3.appendChild(label);
    div3.appendChild(a3);
    parentDiv.appendChild(div3);


    addhr(parentDiv);

    firstDiv.appendChild(parentDiv);

}
function addDom2(ob)
{
    var secondDiv = document.getElementById("secondDiv");

    var parentDiv = document.createElement("div");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");

    //var div4 = document.createElement("div");
    parentDiv.setAttribute("class","col-sm-12 col-xs-12");
    parentDiv.setAttribute("style","margin-top:5px");

    addhr(parentDiv);

    div1.setAttribute("class","col-sm-1 col-xs-3");
    div1.setAttribute("style","padding:10px");
    var img = document.createElement("img");
    img.setAttribute("src","defaultcomm.png");
    img.setAttribute("style","height: 50px;width: 50px;border: 3px solid #fff;background: rgb(255, 255, 255) !important;box-shadow: 0 0 10px rgba(0,0,0,0.5);")
    div1.appendChild(img);
    parentDiv.appendChild(div1);


    div2.setAttribute("class","col-sm-10 col-xs-7");
    div2.setAttribute("style","padding-top:25px;padding-bottom:5px;");
    var para = document.createElement("p");
    var a1 = document.createElement("a");
    a1.innerHTML = ob.commname;
    a1.setAttribute("href","/discussionPage/"+ob._id);
    var a2 = document.createElement("a");
    a2.setAttribute("style","margin-left:5px;")
    a2.innerHTML = "Members("+ob.memberno+")";;
    para.appendChild(a1);
    para.appendChild(a2);
    div2.appendChild(para);
    parentDiv.appendChild(div2);


    addhr(parentDiv);

    secondDiv.appendChild(parentDiv);

}


function addDom3(ob)
{

    var thirdDiv = document.getElementById("thirdDiv");

    var parentDiv = document.createElement("div");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    var div3 = document.createElement("div");
    //var div4 = document.createElement("div");
    parentDiv.setAttribute("class","col-sm-12 col-xs-12");
    parentDiv.setAttribute("style","margin-top:5px");

    addhr(parentDiv);

    div1.setAttribute("class","col-sm-1 col-xs-3");
    div1.setAttribute("style","padding:10px");
    var img = document.createElement("img");
    img.setAttribute("src","defaultcomm.png");
    img.setAttribute("style","height: 50px;width: 50px;border: 3px solid #fff;background: rgb(255, 255, 255) !important;box-shadow: 0 0 10px rgba(0,0,0,0.5);")
    div1.appendChild(img);
    parentDiv.appendChild(div1);


    div2.setAttribute("class","col-sm-10 col-xs-7");
    div2.setAttribute("style","padding-top:25px;padding-bottom:5px;");
    var para = document.createElement("p");
    var pendinglabel = document.createElement("label");
    pendinglabel.setAttribute("class","label label-danger");
    pendinglabel.innerHTML="Pending";
    var a1 = document.createElement("a");
    a1.innerHTML = " " + ob.commname;
    var a2 = document.createElement("a");
    a2.setAttribute("style","margin-left:5px;")
    a2.innerHTML = "  Members("+ob.memberno+")";
    para.appendChild(pendinglabel);
    para.appendChild(a1);
    para.appendChild(a2);
    div2.appendChild(para);
    parentDiv.appendChild(div2);

    div3.setAttribute("class","col-sm-1 col-xs-2");
    div3.setAttribute("style","padding-top:0px");
    var a3 = document.createElement("a");
    //a3.setAttribute("class","community-short-btn");
    a3.setAttribute("style","float:right");
    a3.setAttribute("data-toggle","modal");
    a3.setAttribute("data-target","#cancelModal");
    var label = document.createElement("label");
    label.setAttribute("class","label label-danger");
    var i1 = document.createElement("i");
    i1.setAttribute("class","fa fa-times");
    label.appendChild(i1);
    a3.appendChild(label);
    div3.appendChild(a3);
    parentDiv.appendChild(div3);



    a3.onclick = function()
    {
        cancelyes.onclick = function()
        {
            var delob = new Object();
            delob.id = ob._id;
            var request = new XMLHttpRequest();
            var filename = '/cancelAskToJoin';
            request.open('POST',filename);
            request.setRequestHeader("content-Type","application/JSON");
            request.send(JSON.stringify(delob));
            request.onload = function()
            {
                console.log(request.responseText);
            }
            thirdDiv.removeChild(parentDiv);
        }
    }


    addhr(parentDiv);

    thirdDiv.appendChild(parentDiv);

}

var colorLi = document.getElementById("sidebar-tag");
colorLi.setAttribute("style","background-color:#337ab7;");


function opentaglistpage()
{
    window.location ='/taglistPage';

}
function getMonths(monthno)
  {
    var month=["Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return month[monthno-1];
  }

var submittag = document.getElementById("tag-sub-btn");

function submittagfn( creator)
{

    console.log(creator);
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

    var tag = document.getElementById("input-tag");
    var tagobj = new Object();
    tagobj.tagname = tag.value;
    tagobj.createdby = creator;
    tagobj.createdate = clickday;
    tagobj.deleteaction = "1";
    console.log(tagobj);

    var request = new XMLHttpRequest();
    var filename = 'addtagtotable';
    request.open('POST',filename);
    request.setRequestHeader("content-Type","application/JSON");
    request.send(JSON.stringify(tagobj));
    request.onload = function()
    {
        console.log(request.responseText);
    }
    tag.value="";
}

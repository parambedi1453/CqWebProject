function openbar()
{
    /*var k = document.getElementById("sidebar");
    if(k.style.width == "250px")
    k.style.width ="50px";
    else {
        k.style.width="250px";
    }*/
    var element = document.getElementById("viewscreen");
    element.classList.toggle("toggle-pc");

    var element = document.getElementById("sidebar");
    element.classList.toggle("sidebar-width");


    var element = document.getElementById("rightview");
    element.classList.toggle("set-rightview");
}

function getUserProfile()
{
    window.location ='/userProfile'
}
function getCommPage()
{
    window.location ='/usercommpage'
}
function getPasswordPage()
{
    window.location = '/userchangePassword'
}
//LOGOUT YES BUTTON ONCLICk
function gotologinpage()
{
    window.location = '/exit'
}

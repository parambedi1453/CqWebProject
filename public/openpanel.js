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
function open_adduser_page()
{
    window.location = "/addUser"
}
function changepassword()
{
    window.location ='/changePassword'
}
function admincomm()
{
    window.location ='/adminComm'
}
function homepage()
{
    window.location = "/profilePage"
}
function opentagpage()
{
    window.location = "/tagPage"
}


function openuserlist()
{
    window.location="/userlistPage";
}
/**************************************************************************/
/* switch to user  side function */
function switchyes()
{
    window.location = "/communityPanel";
}
function updateprofilepage()
{
    window.location = "/switcheditbtn";
}
function openCommpage()
{
    window.location = "/communityPanel";
}
function changepassword2()
{
    window.location = "/changePassword2";
}

/************##########################################***********************/
/* switch to user */
function switchToadmin()
{
    window.location = "/profilePage"
}
// ON CLICKING ON GEADERS PHOTO
function openeditpage()
{
    window.location ='/btneditProfile'
}
//LOGOUT YES BUTTON ONCLICk
function gotologinpage()
{
    window.location = '/exit'
}

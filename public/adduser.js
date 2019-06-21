/*var name = document.getElementById("name");
var email = document.getElementById("email2");
var password = document.getElementById("password2");
var phone = document.getElementById("phone");
var city = document.getElementById("City");
var role = document.getElementById("roleid");
var gender = document.getElementById("genderid");
var dob = document.getElementById("dob2");*/
var colorLi = document.getElementById("sidebar-add");
colorLi.setAttribute("style","background-color:#337ab7;");
storeToDb();
function storeToDb()
{
    /*var name = document.getElementById("name");
    var ob = new Object();
    ob.name = name.value;
    ob.email = email.value;
    ob.password = password.value;
    ob.phone = phone.value;
    ob.city = city.value;
    ob.role = role.value;
    ob.gender = gender.value;
    ob.dob = dob.value;
    console.log(ob);*/

    var cancelbtn = document.getElementById("cancel-btn");
    cancelbtn.addEventListener("click",function(event){
        window.location = "/profilePage"
    })

    var submitbtn = document.getElementById("submit-btn");
    submitbtn.addEventListener("click",function(event){
        var name = document.getElementById("name");
        var email = document.getElementById("email2");
        var password = document.getElementById("password2");
        var phone = document.getElementById("phone");
        var city = document.getElementById("City");
        var role = document.getElementById("roleid");
        var gender = document.getElementById("genderid");
        var dob = document.getElementById("dob2");
        var ob = new Object();
        ob.name = name.value;
        ob.email = email.value;
        ob.password = password.value;
        ob.phone = phone.value;
        ob.city = city.value;
        ob.role = role.value;
        ob.gender = gender.value;
        ob.dob = dob.value;
        ob.state = "0";
        ob.status = "pending";
        ob.isupdate = "0";
    //    console.log(ob);
        var request = new XMLHttpRequest();
        var filename = '/createuser';
        request.open('POST',filename);
        request.setRequestHeader("content-Type","application/JSON");
        request.send(JSON.stringify(ob));
        request.onload = function()
        {
            console.log(request.responseText);

        }


    })

}

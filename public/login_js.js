
var username = document.getElementById("username");
var password = document.getElementById("password");
var loginbtn = document.getElementById("loginbtn");

loginbtn.addEventListener("click",function(event){
    if(username.value == "")
    alert("Enter username");
    else if(password.value == "")
    alert("Enter Password");
    else
    {
        var ob = new Object();
        ob.username  = username.value;
        ob.password = password.value;

        var request =new XMLHttpRequest();
        var filename = '/login';
	    request.open('POST',filename);
    	request.setRequestHeader("content-Type","application/JSON");
    	request.send(JSON.stringify(ob));
    	request.onload = function()
    	{
    		console.log(request.responseText);
            //var data = JSON.parse(this.responseText);
            //console.log(data);

            if(request.responseText=="INVALID USER")
            alert("ENTER CORREECT EMAIL/PASSWORD");
            else{
                var logob = JSON.parse(request.responseText);
                if(logob.state == "1")
                window.location="/wrongUser"
                else if(logob.role.toLowerCase() == "user"||logob.role.toLowerCase() == "communitybuilder")
                {
                    if(logob.isupdate=="0")
                    window.location ="/firstTime";
                    else
                    {
                        alert("LOGIN SUCCESSFUL");
                        window.location = "/usercommpage"
                    }
                }
                else {
                    alert("LOGIN SUCCESSFUL");
                    window.location = "/profilePage"
                }

        }
    	}
    }

});

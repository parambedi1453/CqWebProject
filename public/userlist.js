var colorLi = document.getElementById("sidebar-list");
colorLi.setAttribute("style","background-color:#337ab7;");


function getdata() {
        $.fn.dataTable.ext.errMode = 'none';
    var table = $('#userstable').DataTable( {
        //"lengthMenu": [10, 25, 50],
        "processing": true,
        "serverSide": true,
        "ajax" :
        {
                //"tradional" : "true",
            "url" :"/getpaginationtable",
            "type" : "POST",
            "data": function ( d )
            {
                d.role   = $('#role').val();
                d.status = $('#status').val();
            }
            //"dataType":"json",
        },
        "columns":[
            {
            "data" : "email"
            },
            {
            "data" :"phone",
            "sorting" : "false"
            },
            {
            "data" : "city"
            },
            {
            "data" : "status",
            "sorting" : "false",
            },
            {
            "data" : "role",
            "sorting" : "false",
            },
            {
            "data" : null,
            "sorting" : "false"
        },
        ],
        "columnDefs":[{
            "targets": -1,

            //addcol(data)
           "render": function (data, type, row, meta){
                console.log(typeof(data));
                //console.log(meta);
                //console.log(typeof(row));
                //console.log(type);


//                console.log(data._id);

                var ob = row.state;
                data = '<center><button class="btn btn-primary btn-sm action-btn" data-toggle="modal" data-target="#emailModal" onclick=sendMailto("'+row.email+'") style="background-color:rgb(0, 0, 0)"><span class="fa fa-envelope" style="color:"#fff"></span></button>'
                data=data+'<button class="btn btn-primary btn-sm action-btn" data-toggle="modal" data-target="#editModal" onclick=updateUser("'+row._id+'","'+row.email+'","'+row.phone+'","'+row.city+'","'+row.status+'","'+row.role+'")><span class="fa fa-edit" style="color : #fff;" ></span></button>'
                if(ob == '0')
                {
                    data = data+'<button class="btn btn-warning btn-sm action-btn" data-toggle="modal" data-target="#yellowModal" id="yellowbttn" onclick=updateState("'+row._id+'","'+row.state+'")><span class="fa fa-times-circle" style="color:#fff;"></span></center>'
                }
                else if(ob == '1')
                {
                    data = data+'<button class="btn btn-success btn-sm action-btn" data-toggle="modal" data-target="#greenModal" id="greenbttn" onclick=updateState("'+row._id+'","'+row.state+'")><span class="fa fa-check-circle" style="color:#fff;"></span></button></center>'
                }
                return data;
            }

        }],
    })
    $('#refresh').on('click', function () {
        table.ajax.reload(null, false);
    });

    $('#role').on('change', function () {
        table.ajax.reload(null, false);
    });

    $('#status').on('change', function () {
        table.ajax.reload(null, false);
    });
}

$(document).ready(function() {

  console.log("1");
  getdata()

})


function updateUser(uid,email,phone,city,status,role)
{
    console.log(uid);
    console.log(email);
    console.log(phone);
    console.log(city);
    console.log(status);
    console.log(role);
    $('#eheading').html("Update "+ email);
    $('#eusername').val(email);
    $('#ephone').val(phone);
    $('#ecity').val(city);
    $('#estatus').val(status.toLowerCase());
    $('#erole').val(role.toLowerCase());

    $("#eupdate").click(function(){

        var uob =
        {
            email : $("#eusername").val(),
            phone : $("#ephone").val(),
            city : $("#ecity").val(),
            status :  $("#estatus").val(),
            role : $("#erole").val(),
            id : uid
        }
        $.ajax({
               url: '/updatelist',
               type: 'post',
               dataType: 'json',
               contentType: 'application/json',
               success: function (data) {

               },
               data: JSON.stringify(uob)
           });

  });
}

function sendMailto(email)
{
    $("#emailto").val(email);
    $("#sendMailBttn").click(function(){

        var ob =
        {
            email : $("#emailto").val(),
            subject : $("#mailsubject").val(),
            textarea : $("#sendMail").val(),
        }

        var request = new XMLHttpRequest();
        var filename = '/mailPostrequest';
        request.open('POST',filename);
        request.setRequestHeader("content-Type","application/JSON");
        request.send(JSON.stringify(ob));
        request.onload = function()
        {
            console.log(request.responseText);
        }

    });

}
function updateState(uid,ustate)
{
    console.log(uid);
    console.log(ustate);

    $("#yellowyes").click(function(){

        var uob =
        {
            state : ustate,
            id : uid,
        }
        $.ajax({
               url: '/deactivate',
               type: 'post',
               dataType: 'json',
               contentType: 'application/json',
               success: function (data) {

               },
               data: JSON.stringify(uob)
           });
           window.location="/userlistPage";

    });

    $("#greenyes").click(function(){

        var uob =
        {
            state : ustate,
            id : uid,
        }
        $.ajax({
               url: '/activate',
               type: 'post',
               dataType: 'json',
               contentType: 'application/json',
               success: function (data) {

               },
               data: JSON.stringify(uob)
           });

           window.location="/userlistPage";
    });
}



    $(document).ready(function(){
      $.trumbowyg.svgPath="trumbowyg.svg"
      $("#sendMail").trumbowyg();
   })
/*
$('#users-table').on('search.dt', function() {
    var value = $('.dataTables_filter input').val();
    console.log(value); // <-- the value
})
*/

//var table = $('#users-table').DataTable();

// #column3_search is a <input type="text"> element
/*$('#column3_search').on( 'keyup', function () {
    table
        .columns( 3 )
        .search( this.value )
        .draw();
} );


*/




/*IOUS DOM MANUPULATIONS

var myuserId = 1;
var myuserArr = [];
var myuserpreviousId;
var userrole = document.getElementById("role-btn");
var userstatus = document.getElementById("status-btn");
var tbody = document.getElementById("table-body");

loadFromServer();

function loadFromServer()
{
    var filename = '/gettable';
    var request = new XMLHttpRequest();
    request.open('GET',filename);
    request.send();
    request.onload = function()
    {
        console.log(request.responseText);
        myuserArr = JSON.parse(request.responseText);
        if(myuserArr.length == 0)
        myuserId = 1;
        else {
            for(var i in myuserArr)
            {
                addEntryToDom(myuserArr[i]);
                //myuserpreviousId = parseInt(myuserArr[i].id)
            }
            update_table();
        }
    }
}
function insertYellowbutton(target,ob)
{
        var b3 = document.createElement("button");
        b3.setAttribute("class","btn btn-warning btn-sm action-btn");
        b3.setAttribute("data-toggle","modal");
        b3.setAttribute("data-target","#yellowModal");
        b3.setAttribute("id","yellowbttn");
        var span3 = document.createElement("span");
        span3.setAttribute("class","fa fa-times-circle")
        span3.setAttribute("style","color:#fff");
        b3.appendChild(span3);

        b3.onclick = function()
        {
            var yellowParaContent = document.getElementById("yellowContent");
            yellowParaContent.innerHTML = "Are you sure you want to deactivate "+ ob.email;
            // 0 is activated state that is yellow btn and grren is deactivate i.e 1
            yellowyes.onclick = function()
            {
                var stateobj = new Object();
                stateobj.id = ob._id;
                var request = new XMLHttpRequest();
                var filename = '/deactivate';
                request.open('POST',filename);
                request.setRequestHeader("content-Type","application/JSON");
                request.send(JSON.stringify(stateobj));
                request.onload = function()
                {
                    console.log(request.responseText);
                }
                target.removeChild(b3);
                insertGreenbutton(target,ob);
            }
        }
        target.appendChild(b3);

}
function insertGreenbutton(target,ob)
{
    var b4 = document.createElement("button");
    b4.setAttribute("class","btn btn-success btn-sm action-btn");
    b4.setAttribute("data-toggle","modal");
    b4.setAttribute("data-target","#greenModal");
    b4.setAttribute("id","greenbttn");
    var span4 = document.createElement("span");
    span4.setAttribute("class","fa fa-check-circle")
    span4.setAttribute("style","color:#fff");
    b4.appendChild(span4);

    b4.onclick=function()
    {
        //console.log("hgjkb");
        var greenParaContent = document.getElementById("greenContent");
        greenParaContent.innerHTML = "Are you sure you want to activate "+ ob.email;

        greenyes.onclick = function()
        {
            var actobj = new Object();
            actobj.id = ob._id;
            var request = new XMLHttpRequest();
            var filename = '/activate';
            request.open('POST',filename);
            request.setRequestHeader("content-Type","application/JSON");
            request.send(JSON.stringify(actobj));
            request.onload = function()
            {
                console.log(request.responseText);
            }
            target.removeChild(b4);
            insertYellowbutton(target,ob);
        }
    }
    target.appendChild(b4);
}

function addEntryToDom(ob)
{
//    console.log(ob.state);
    var row = document.createElement("tr");
    var col1 = document.createElement("td");
    var col2 = document.createElement("td");
    var col3 = document.createElement("td");
    var col4 = document.createElement("td");
    var col5 = document.createElement("td");
    var col6 = document.createElement("td");

    col1.innerHTML = ob.email;
    col2.innerHTML = ob.phone;
    col3.innerHTML = ob.city;
    col4.innerHTML = ob.status;
    col5.innerHTML = ob.role;

//  EMAIL BUTTON
    var b1 = document.createElement("button");
    b1.setAttribute("class","btn btn-primary btn-sm action-btn");
    b1.setAttribute("style","background-color:rgb(0, 0, 0)");
    var span1 = document.createElement("span");
    span1.setAttribute("class","fa fa-envelope")
    span1.setAttribute("style","color:#fff");
    b1.appendChild(span1);
    col6.appendChild(b1);


//************   UPDATE BUTTON   *******

    var b2 = document.createElement("button");
    b2.setAttribute("class","btn btn-primary btn-sm action-btn");
    b2.setAttribute("id","editbutton");
    b2.setAttribute("data-toggle","modal");
    b2.setAttribute("data-target","#editModal");
    var span2 = document.createElement("span");
    span2.setAttribute("class","fa fa-edit")
    span2.setAttribute("style","color:#fff");
    b2.appendChild(span2);
    col6.appendChild(b2);
    b2.onclick=function(){



        var eheading = document.getElementById("eheading");
        eheading.innerHTML=ob.email;

        var eusername = document.getElementById("eusername");
        eusername.value = ob.email;

        var ephone = document.getElementById("ephone");
        ephone.value=ob.phone;

        var ecity = document.getElementById("ecity");
        ecity.value=ob.city;

        var status = document.getElementById("estatus");
        estatus.value=ob.status.toLowerCase();

        var erole = document.getElementById("erole");
        erole.value = ob.role.toLowerCase();

        eupdate.onclick = function()
        {
            var uobj = new Object();
            uobj.id = ob._id;
            uobj.email = eusername.value;
            uobj.phone = ephone.value;
            uobj.city = ecity.value;
            uobj.status = estatus.value;
            uobj.role = erole.value;

            var request = new XMLHttpRequest();
            var filename = '/updatelist';
            request.open('POST',filename);
            request.setRequestHeader("content-Type","application/JSON");
            request.send(JSON.stringify(uobj));
            request.onload = function()
            {
                console.log(request.responseText);
            }
        }



    }

    //********** BUTTON 3 *****************
    if(ob.state == "0")//show yellow
    {
        insertYellowbutton(col6,ob);
    }
    else if(ob.state == "1")
    {
        insertGreenbutton(col6,ob);
    }





    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);
    row.appendChild(col6);

    tbody.appendChild(row);


}


function update_table()
   {
     $(document).ready(function() {
       $('#users-table').DataTable();
     })
   }
*/

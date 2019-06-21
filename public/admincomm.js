var colorLi = document.getElementById("sidebar-comm");
colorLi.setAttribute("style","background-color:#337ab7;");



function getdata() {

    $.fn.dataTable.ext.errMode = 'none';
    let table = $('#community-table').DataTable( {
        "processing": true,
        "serverSide": true,
        "ajax" :
        {
            "url" :"/getCLP",
            "type" : "POST",
            "data" : function(d) {
              d.commrule= $('#joinrule').val();
            }

        },
        "columns":[
            {
            "data" : "commname"
            },
            {
            "data" :"commrule",

            },
            {
            "data" : "commlocation"
            },
            {
            "data" : "commowner",

            },
            {
            "data" : "commdate",

            },
            {
            "data" : null,
            },
            {
            "data" : null,
            },
        ],

        "columnDefs":[{
            "targets": 5,

            //addcol(data)
           "render": function (data, type, row, meta){

                data = '<center><button class="btn btn-primary btn-sm action-btn" data-toggle="modal" data-target="#editCommModal" onclick=updateComm("'+row._id+'","'+row.commname+'","'+row.commstatus +'") style="background-color:rgb(0, 0, 0)"><span class="fa fa-edit" style="color:"#fff"></span></button>'
                data = data+ '<button class="btn btn-primary btn-sm action-btn" data-toggle="modal" data-target="#infoModal" onclick=infoComm("'+row._id+'","'+row.commname+'","'+ encodeURIComponent(row.commdesc) +'") style="background-color:rgb(0, 0, 0)"><span class="fa fa-info" style="color:"#fff"></span></button></center>'

                return data;
            }

        },
        {
            "targets" : 6,
            "render": function (data, type, row, meta){
                data = '<center><img src="/defaultcomm.png" style="height:80px;width:80px;border:4px solid green;"></center>'
                return data;
             }

        }],
 })

 $('#joinrule').on('change', function () {
     table.ajax.reload(null, false);
 });

 $('#refresh').on('change', function () {
     table.ajax.reload(null, false);
 });
}

$(document).ready(function() {
  console.log("1");
  getdata()
})


function updateComm(cid,cname,cstatus)
{
    console.log(cid);
    console.log(cname);
    $("#setModalTitle").html("Update "+cname);
    $("#communityname").val(cname);
    $("#communitystatus").val(cstatus);
    /*if(cstatus=="1")
    $("#communitystatus").val();
    else {
        $("#communitystatus").val("Not-active");
    }*/

    $("#updateCommbttn").click(function(){


        var ob =
        {
            commname : $("#communityname").val(),
            commstatus :$("#communitystatus").val(),
            id : cid
        }

        var request = new XMLHttpRequest();
        var filename = '/updateCommunityByTable';
        request.open('POST',filename);

        request.setRequestHeader("content-Type","application/JSON");
        request.send(JSON.stringify(ob));
        request.onload = function()
        {
            console.log(request.responseText);

        }

    });
}

function infoComm(cid,cname,cdesc)
{
    cdesc = decodeURIComponent(cdesc);
    console.log(cdesc);
    $("#sethead").html(cname);
    $("#descmodal").html(cdesc);
}

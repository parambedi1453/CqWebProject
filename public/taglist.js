var colorLi = document.getElementById("sidebar-tag");
colorLi.setAttribute("style","background-color:#337ab7;");


var tagArr = [];
var yesbtn = document.getElementById("yesdelbtn")
var tbody = document.getElementById("tablebody");



getTable();

function getTable()
{
    var filename = 'getTagTable';
    var request = new XMLHttpRequest();
    request.open('GET',filename);
    request.send();
    request.onload = function()
    {
        console.log(request.responseText);
        tagArr = JSON.parse(request.responseText);
        for(var i in tagArr)
        {
            addToDom(tagArr[i]);
        }
        update_table();
    }
}
function addToDom(ob)
{
    console.log(ob.tagname);
    console.log(ob.createdby);
    console.log(ob.createdate);
    console.log(ob.deleteaction);
    console.log(ob._id);
    if(ob.deleteaction=="1")
    {
        var row = document.createElement("tr");
        var col1 = document.createElement("td");
        var col2 = document.createElement("td");
        var col3 = document.createElement("td");
        var col4 = document.createElement("td");
        col1.setAttribute("class","text-center");
        col1.innerHTML = ob.tagname;
        col2.innerHTML = ob.createdby;
        col3.innerHTML = ob.createdate;

        col4.setAttribute("class","text-center");
        var delbtn = document.createElement("button");
        delbtn.setAttribute("class","btn btn-sm");
        delbtn.setAttribute("style","margin-top:0;background-color:#2D312C;color:#fff")
        delbtn.setAttribute("data-toggle","modal");
        delbtn.setAttribute("data-target","#delModal");
        var span = document.createElement("span");
        span.setAttribute("class","fa fa-trash");
        delbtn.appendChild(span);
        col4.appendChild(delbtn);

        delbtn.onclick = function()
        {
            yesbtn.onclick = function()
            {
                var delobject = new Object();
                delobject.id = ob._id;
                delobject.name = ob.tagname;
                var request = new XMLHttpRequest();
                var filename = '/delTag';
                request.open('POST',filename);
                request.setRequestHeader("content-Type","application/JSON");
                request.send(JSON.stringify(delobject));
                request.onload = function()
                {
                    console.log(request.responseText);
                }
                tbody.removeChild(row);
            }
        }

        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);

        tbody.appendChild(row);
    }

}

function update_table()
   {
     $(document).ready(function() {
       $('#tags-table').DataTable();
     })
   }

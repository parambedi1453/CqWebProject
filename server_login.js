var express = require('express')
var path = require('path')
var app = express()
var ejs = require('ejs')
var session = require('express-session')
var nodemailer = require('nodemailer');
var multer = require('multer');
var passport = require('passport');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({secret: "abc"}))

//var session = require('express-session');
//Acces static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/uploads')));

//Bodyparser
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({secret: "xYzUCAchitkara"}));
//Connect with db

var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/cqdatabase';

mongoose.connect(mongoDB);

mongoose.connection.on('error',(err) => {
  console.log('DB connection Error');
})

mongoose.connection.on('connected',(err) => {
  console.log('DB connected');
})

var productSchema = new mongoose.Schema({
    name : String,
    email : String,
    password : String,
    phone : Number,
    city : String,
    dob : String,
    role : String,
    gender : String,
    status: String,
    state:String,
    interest:String,
    journey:String,
    expectations:String,
    githubid:String,
    photoname:String,
    isupdate:String,
    ownedcomm : [{type : mongoose.Schema.Types.ObjectId , ref : 'communities'}],
    joincomm :  [{type : mongoose.Schema.Types.ObjectId , ref : 'communities'}],
    asktojoincomm : [{type : mongoose.Schema.Types.ObjectId , ref : 'communities'}],
})
var instance = mongoose.model('admins', productSchema);
var tagSchema = new mongoose.Schema({
    tagname : String,
    createdby : String,
    createdate : String,
    deleteaction : String
})
var taginstance = mongoose.model('tags',tagSchema);

var communitySchema = new mongoose.Schema({
    commname : String,
    commrule : String,
    commlocation : String,
    commowner : String,
    // commpic : {type : String, default : ""}
    commpic : String,
    commdesc : String,
    commdate :String,
    commstatus : String,
    ownerid : {type : mongoose.Schema.Types.ObjectId , ref : 'admins'},
    memberno : Number,
    commjoin : [{type : mongoose.Schema.Types.ObjectId , ref : 'admins'}],
    commasktojoin : [{type : mongoose.Schema.Types.ObjectId , ref : 'admins'}],
    comminvite : [{type : mongoose.Schema.Types.ObjectId , ref : 'admins'}],
    commdiscussion :  { type : Array , "default" : [] },
})
var comminstance = mongoose.model('communities', communitySchema);

app.get('/profilePage',function(req,res){
    console.log("helloo world");
    console.log("***************************")
    console.log(req.session);
    console.log("***************************")


    res.render('profile',{obj : req.session.data});
})

app.get('/addUser',function(req,res){
    res.render('adduser',{obj : req.session.data});
})

app.get('/changePassword',function(req,res){
    res.render('changepassword',{obj : req.session.data})
})
app.get('/tagPage',function(req,res){
    res.render('tag',{obj : req.session.data})
})
app.get('/taglistPage',function(req,res){
    res.render('taglist',{obj : req.session.data})
})

app.get('/userlistPage',function(req,res){
    res.render('userlist.ejs',{obj : req.session.data})
})
app.get('/btneditProfile',function(req,res){
    res.render('btneditprofile.ejs',{obj : req.session.data})

})
app.get('/editProfile',function(req,res){
    res.render('editprofile.ejs',{obj : req.session.data})

})
app.get('/exit',function(req,res){
    res.render('login_page.ejs',{obj:"hgjh"});
})
app.get('/wrongUser',function(req,res){
    res.render('wronguser',{});
})
app.get('/communityPanel',function(req,res){
    res.render('communitypanel',{obj : req.session.data});
})
app.get('/switcheditProfile',function(req,res){
    res.render('switcheditprofile',{obj : req.session.data});
})
app.get('/switcheditbtn',function(req,res){
    res.render('switchbtneditprofile',{obj : req.session.data});
})
app.get('/adminComm',function(req,res){
    res.render('admincomm',{obj : req.session.data});
})
app.get('/changePassword2',function(req,res){
    res.render('switchchangepassword',{obj : req.session.data});
})
app.get('/firstTime',function(req,res){
    res.render('firsttime',{obj:req.session.data});
})

/*******************  USER LOGIN SERVER  *************************/

app.get('/usercommpage',function(req,res){
    res.render('usercommunity',{obj : req.session.data});
})
app.get('/usercommpageswitch',function(req,res){
    res.render('communitypanel',{obj : req.session.data});
})
app.get('/userProfile',function(req,res){
    res.render('userprofile',{obj : req.session.data});
})
app.get('/userEditProfile',function(req,res){
    res.render('usereditprofile',{obj : req.session.data});
})
app.get('/userchangePassword',function(req,res){
    res.render('userchangepassword',{obj : req.session.data});
})
app.get('/addCommunity',function(req,res){
    res.render('addcommunity',{obj : req.session.data});
})
app.get('/addCommunitySwitch',function(req,res){
    res.render('addcommunityswitch',{obj : req.session.data});
})
app.get('/userSearch',function(req,res){
    res.render('usersearch',{obj : req.session.data});
})
app.get('/userSearchswitch',function(req,res){
    res.render('usersearchswitch',{obj : req.session.data});
})
app.get('/communityProfilePage/:pro',function(req,res){

    var aid = req.params.pro;
    comminstance.findOne({"_id" : aid} ,function(error,result){
        if(error)
        throw error;
        else {
            console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
            console.log(result);
            console.log("YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY")
            res.render('communityprofile',{ objcomm : result , obj : req.session.data });
        }
    })

})
app.get('/communityProfilePageSwitch/:pro',function(req,res){

    var aid = req.params.pro;
    comminstance.findOne({"_id" : aid} ,function(error,result){
        if(error)
        throw error;
        else {
            res.render('communityprofileswitch',{ objcomm : result , obj : req.session.data });
        }
    })

})
app.get('/settingsPage/:pro',function(req,res){
    var aid = req.params.pro;
    comminstance.findOne({"_id" : aid} ,function(error,result){
        if(error)
        throw error;
        else {
            res.render('settings',{ objcomm : result , obj : req.session.data });
        }
    })
})
app.get('/settingsPageSwitch/:pro',function(req,res){
    var aid = req.params.pro;
    comminstance.findOne({"_id" : aid} ,function(error,result){
        if(error)
        throw error;
        else {
            res.render('settingsswitch',{ objcomm : result , obj : req.session.data });
        }
    })
})
app.get('/discussionPage/:pro',function(req,res){
    var aid = req.params.pro;
    comminstance.findOne({"_id" : aid} ,function(error,result){
        if(error)
        throw error;
        else {
            res.render('discussion',{ objcomm : result , obj : req.session.data });
        }
    })
})

/******************************************************************/
/*app.post('/login',function(req,res){
    console.log(req.body);
    instance.find({
        email : req.body.username,
        password : req.body.password
    })
    .then(data => {
        //console.log(data)
        //res.send(data);
        if(data.length>0)
        {
            console.log("user is valid");

                var ob = new Object();
                ob.isLogin = 1;
                ob.name = data[0].name;
                ob.email = data[0].email;
                ob.password = data[0].password;
                ob.phone = data[0].phone;
                ob.city = data[0].city;
                ob.dob = data[0].dob;
                ob.role = data[0].role;
                ob.gender = data[0].gender;
                req.session.data = ob;
                res.send(data);
        }
        else {
            res.send("INVALID USER");
        }

    })
    .catch(err => {
        console.error(err)
        res.send(err)
      })

});*/

//AFTER LOGIN CREATE SESSION FUNCTION
app.post('/login',function(req,res){
    console.log(req.body);
    instance.findOne({
        email : req.body.username,
        password : req.body.password
    })
    .then(data => {
        console.log(data)
        //res.send(data);
        if(data)
        {
            console.log("user is valid");

                var ob = new Object();
                ob.isLogin = 1;
                ob.name = data.name;
                ob.email = data.email;
                ob.password = data.password;
                ob.phone = data.phone;
                ob.city = data.city;
                ob.dob = data.dob;
                ob.role = data.role;
                ob.gender = data.gender;
                ob.status = data.status;
                ob.state  = data.state;
                ob.interest = data.interest;
                ob.journey = data.journey;
                ob.expectations = data.expectations;
                ob.githubid = data.githubid;
                ob._id = data._id;
                ob.photoname = data.photoname;
                ob.isupdate = data.isupdate,
                req.session.data = ob;
                res.send(data);
        }
        else {
            res.send("INVALID USER");
        }

    })
    .catch(err => {
        console.error(err)
        res.send(err)
      })

})
//ADD USER to ADMINS TABLE
app.post('/createuser',function(req,res){
    console.log(req.body);
    instance.create(req.body,function(error,result){
        if(error)
        throw error;
        else {
            console.log(result);
            var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'parambedi1453@gmail.com',
            pass: 'nokia15091998'
            }
            });

            var mailOptions = {
            from: 'parambedi1453@gmail.com',
            to: req.body.email,
            subject: 'This Mail Is From CQ',
            text: 'Hi you are enrolled to cq with username'+req.body.email+'and password'+req.body.password
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
            });



        }
    })

})
//ADD TAG TO TABLE FUNCTION
app.post('/addtagtotable',function(req,res){
    console.log(req.body);
    taginstance.create(req.body,function(error,result){
        if(error)
        throw error;
        else {
            console.log(result);
            res.send("Tag entered");
        }
    })
})
//ADD COMMUNITY
app.post('/createcomm',function(req,res){
    console.log(req.body);
    comminstance.create(req.body,function(error,result){
        if(error)
        throw error;
        else {
            console.log(result);
            /*var pushob = new Object();
            pushob.id = result._id;
            pushob.cname = result.commname;
            pushob.cdesc = result.commdesc;
            pushob.cdate = result.commdate;*/

            instance.updateOne({"_id" : req.session.data._id},{ $push : {ownedcomm : result._id }},function(error,result)
            {
                if(error)
                throw error;
                else {
                    console.log("ENTERED IN USER DATABASE ALSO")
                }
            })
            res.send("Community Entered");
        }
    })
})
//Add Discusssions to comm
/*
    db.update({'Searching criteria goes here'},
    {
     $push : {
        trk :  {
                 "lat": 50.3293714,
                 "lng": 6.9389939
               } //inserted data is the object to be inserted
      }
    });
*/
app.post('/enterCommDiscusions',function(req,res){
    console.log(req.body);
    comminstance.updateOne({"_id" : req.body.id},
    {
        $push : {
            commdiscussion : {
                                "dtitle" : req.body.dicussiontitle,
                                "ddetail" : req.body.discussiondetail,
                                "pname" : req.body.pname,
                                "pid" : req.body.pid,
                                "dday" : req.body.day,
                            }
        }
    },function(error,result)
    {
        if(error)
        throw error;
        else {
            res.send("DiSCUSSSION ENTERED");
        }

    })
})
//get Comm Discussions

app.post('/getCommDiscusions',function(req,res){

    comminstance.findOne({"_id" : req.body.id}).exec(function(error,result)
    {
        if(error)
        throw error;
        else {
            res.send(result);
        }
    })
})
//ADD JOINED MEMBERS TO COMMUNITY
app.post('/joinbtnclick',function(req,res)
{
    console.log(req.body);
    if(req.body.commrule == "d")
    {
        comminstance.updateOne({"_id" : req.body._id},{ $push : {commjoin : req.session.data._id}},function(error,result)
        {
            if(error)
            throw error;
            else {
                res.send("USER JOINED WITH COMMUNITY");
            }
        })

        //MAKE CHANGES IN USER ALSO THAT WHICH COMMUNITIES IT HAS JOINED
        instance.updateOne({"_id" : req.session.data._id},{ $push : {joincomm : req.body._id }},function(error,result)
        {
            if(error)
            throw error;
            else {
                console.log("ENTERED IN USER DATABASE ALSO")
            }
        })
    }
    else if(req.body.commrule == "p")
    {
        comminstance.updateOne({"_id" : req.body._id},{ $push : {commasktojoin : req.session.data._id}},function(error,result)
        {
            if(error)
            throw error;
            else {
                res.send("USER HAS REQUESTED THIS COMMUNITY");
            }
        })

        instance.updateOne({"_id" : req.session.data._id},{ $push : {asktojoincomm : req.body._id }},function(error,result)
        {
            if(error)
            throw error;
            else {
                console.log("ENTERED IN USER DATABASE ALSO")
            }
        })
    }


})
//GET USER TABLE FUNCTION
/*app.get('/gettable',function(req,res){

    var tdata = instance.find({}).exec(function(error,result){
        if(error)
        throw error;
        else {
            res.send(JSON.stringify(result));
        }
    })


})*/

//GET TAG TABLE OPERATION
app.get('/getTagTable',function(req,res){

    var tdata = taginstance.find({}).exec(function(error,result){
        if(error)
        throw error;
        else {
            res.send(JSON.stringify(result));
        }
    })


})
//get community TABLE

app.get('/getCommunityforUser',function(req,res){


    comminstance.find({ $or: [{ ownerid : req.session.data._id },{commjoin : {$in : [req.session.data._id] }},{commasktojoin : {$in : [req.session.data._id] }}] }).exec(function(error,result){
        if(error)
        throw error;
        else {
            res.send(JSON.stringify(result));
        }
    })
})

app.get('/getCommunityforSearch',function(req,res){


    comminstance.find({ $and: [{ ownerid : { $not : { $eq : req.session.data._id }}},{commjoin : {$nin : [req.session.data._id] }},{commasktojoin : {$nin : [req.session.data._id] }}] }).exec(function(error,result){
        if(error)
        throw error;
        else {
            res.send(JSON.stringify(result));
        }
    })

})

// TO CANCEL ASK TO JOIN REQUEST
app.post('/cancelAskToJoin',function(req,res){

    comminstance.update({"_id" : req.body.id},{ $pull : { commasktojoin : { $in : [req.session.data._id]}}} ,function(error,result){
        if(error)
        throw error;
        else {


            instance.update({"_id" : req.session.data._id},{ $pull : { asktojoincomm : { $in : [req.body.id]}}},function(error,result){

                if(error)
                throw error;
                else {
                    res.send("DELETED FROM EVERYWHERE");
                }
            })
        }
    })

})
//To get Community Members details
app.post('/getcommdetails' , function(req,res){

    var query = [{path : 'commjoin',select : {'name' : 1 ,'photoname' : 1}},{path : 'commasktojoin',select : {'name' : 1 ,'photoname' : 1}},{path : 'communityrequest',select : {'name' : 1 ,'photoname' : 1}},{path : 'ownerid',select : {'name' : 1 ,'photoname' : 1}}];// YE ABB Ids ki jgh array of objects bnn gaya hai
    comminstance.findOne({ "_id" : req.body.id }).populate(query).exec(function(error,resultobj){
        if(error)
        throw error;
        else {
            console.log(resultobj);
            res.send(resultobj);
        }
    });
});

//CHANGE PASSWORD OPERATION
app.post('/editpassword',function (req,res)
{
    serverobject = req.body;
    if(serverobject.oldp!=req.session.data.password)
    {
       res.send("INCORRECT USER");
    }
    else {
       instance.updateOne({ "_id" : req.session.data._id} , { $set: { "password" : serverobject.newp }} , function(error,result)
       {
           if(error)
           throw error;
           else {
               req.session.data.password = serverobject.newp
               console.log(req.session.data.password);
               res.send("PASSWORD CHANGED");
           }
       })
       //res.send("PASSWORD CHANGED");
    }
})
//DELETE TAG OPERATION
app.post('/delTag',function(req,res){
    //serverobject = req.body;
    console.log(req.body.name);
    taginstance.updateOne({"_id" : req.body.id},{ $set:{"deleteaction" : "0"}},function(error,result){
        if(error)
        throw error;
        else {
            res.send("ACTION COMPLETED");
        }
    })
})
//DEACTIVATE USER FUNCTION
app.post('/deactivate',function(req,res){
    //serverobject = req.body;
    //console.log(req.body.name);
    instance.updateOne({"_id" : req.body.id},{ $set:{"state" : "1"}},function(error,result){
        if(error)
        throw error;
        else {
            res.send("STATE CHANGED");
        }
    })
})
//ACTIVATE USER FUNCTION
app.post('/activate',function(req,res){
    //serverobject = req.body;
//    console.log(req.body.name);
    instance.updateOne({"_id" : req.body.id},{ $set:{"state" : "0"}},function(error,result){
        if(error)
        throw error;
        else {
            res.send("ACTIVATED");
        }
    })
})
//UPDATE USER LIST
app.post('/updatelist',function(req,res){

    instance.updateOne({"_id" : req.body.id},{ $set:{"email":req.body.email,"phone":req.body.phone,"city":req.body.city,"status":req.body.status,"role":req.body.role}},function(error,result){
        if(error)
        throw error;
        else {
            if(req.body.id == req.session.data._id)
            {
                req.session.data.email = req.body.email;
                req.session.data.phone = req.body.phone;
                req.session.data.city = req.body.city;
                req.session.data.status = req.body.status;
                req.session.data.role = req.body.role;
            }
            res.send("UPDATED");
        }
    })
})
//UPDATE COMMUNITY LIST
app.post('/updateCommunityByTable',function(req,res){

    comminstance.updateOne({"_id" : req.body.id},{ $set:{"commname":req.body.commname,"commstatus":req.body.commstatus}},function(error,result){
        if(error)
        throw error;
        else {

            res.send("UPDATED");
        }
    })
})

//EDIT PROFILE REQUEST
app.post('/editProfile',function(req,res){

    console.log(req.body);
    console.log(req.session.data);
    instance.updateOne({"_id" : req.session.data._id},{$set : {"email":req.body.email,"name" : req.body.name,"dob":req.body.dob,"gender":req.body.gender,"phone":req.body.phone,"city":req.body.city,"interest":req.body.interest,"journey":req.body.journey,"expectations":req.body.expectations,"isupdate":req.body.isupdate}},function(error,result){
        if(error)
        throw error;
        else {

            req.session.data.email = req.body.email;
            req.session.data.name = req.body.name;
            req.session.data.phone = req.body.phone;
            req.session.data.dob = req.body.dob;
            req.session.data.city = req.body.city;
            req.session.data.gender = req.body.gender;
            res.send("UPDATED");
        }
    })

})
app.post('/mailPostrequest',function(req,res)
{
    console.log(req.body);


    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'parambedi1453@gmail.com',
    pass: 'nokia15091998'
    }
    });

    var mailOptions = {
    from: 'parambedi1453@gmail.com',
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.textarea,
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
    console.log('Email sent: ' + info.response);
    }
    });
    res.send("MAIL SENT");

})
// get table using pagination

    /*app.post('/getpaginationtable' , function(req, res) {

    instance.countDocuments(function(e,count){
      var start=parseInt(req.body.start);
      var len=parseInt(req.body.length);
      console.log(start);
      console.log(len);
      instance.find({

      }).skip(start).limit(len)
    .then(data=> {
      res.send({"recordsTotal": count, "recordsFiltered" : count, data})
     })
     .catch(err => {
      res.send(err)
     })
    });
})
*/

//get community pagination


app.post('/getpaginationtable',function (req, res) {
    // console.log(req.body);
    // console.log(req.body.order[0].column);
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    var count;

    if(req.body.order[0].column==0)
    {
      if(req.body.order[0].dir=="asc")
      getdata("email",1);
      else
      getdata("email",-1);
    }
    else if(req.body.order[0].column==1)
    {
      if(req.body.order[0].dir=="asc")
      getdata("phone",1);
      else
      getdata("phone",-1);
    }
    else if(req.body.order[0].column==2)
    {
      if(req.body.order[0].dir=="asc")
      getdata("city",1);
      else
      getdata("city",-1);
    }
    else if(req.body.order[0].column==3)
    {
      if(req.body.order[0].dir=="asc")
      getdata("status",1);
      else
      getdata("status",-1);
    }
    else if(req.body.order[0].column==4)
    {
      if(req.body.order[0].dir=="asc")
      getdata("role",1);
      else
      getdata("role",-1);
    }

    else {
      getdata("email",1);
    }


    function getdata(colname,sortorder)
    {
        instance.countDocuments(function(e,count){
          var start=parseInt(req.body.start);
          var len=parseInt(req.body.length);
          var role=req.body.role;
          var status=req.body.status;
          var search=req.body.search.value;
          var getcount=10;
         // console.log(req.body.search.value.length);


        var findobj={};
          console.log(role,status);
          if(role!="all")
             { findobj.role=role;
             }
          else{
              delete findobj["role"];
          }
          if(status!="all")
              {findobj.status=status;}
          else{
              delete findobj["status"];
          }
          if(search!='')
              findobj["$or"]= [{
              "email":  { '$regex' : search, '$options' : 'i' }
          }, {
              "city": { '$regex' : search, '$options' : 'i' }
          }
          ,{
              "status":  { '$regex' : search, '$options' : 'i' }
          }
          ,{
              "role": { '$regex' : search, '$options' : 'i' }
          }]
          else{
              delete findobj["$or"];
          }


          instance.find(findobj).countDocuments(function(e,coun){
          getcount=coun;
        }).catch(err => {
          console.error(err)
          res.send(err)
        })

          instance.find(findobj).skip(start).limit(len).sort({[colname] : sortorder})
          .then(data => {
              res.send({"recordsTotal" : count,"recordsFiltered" :getcount,data})
            })
            .catch(err => {
              console.error(err)
            //  res.send(error)
            })
        });
      }
});

//--------------------GETCLP----------------------------------------------
app.post('/getCLP',function (req, res) {
      console.log("fvgbhnjk");
      var count;
      console.log(req.body);

      if(req.body.order[0].column==0)
      {
        if(req.body.order[0].dir=="asc")
        getdata("commname",1);
        else
        getdata("commname",-1);
      }
      else if(req.body.order[0].column==1)
      {
        if(req.body.order[0].dir=="asc")
        getdata("commrule",1);
        else
        getdata("commrule",-1);
      }
      else if(req.body.order[0].column==2)
      {
        if(req.body.order[0].dir=="asc")
        getdata("commlocation",1);
        else
        getdata("commlocation",-1);
      }
      else if(req.body.order[0].column==3)
      {
        if(req.body.order[0].dir=="asc")
        getdata("commowner",1);
        else
        getdata("commowner",-1);
      }
      else if(req.body.order[0].column==4)
      {
        if(req.body.order[0].dir=="asc")
        getdata("commdate",1);
        else
        getdata("commdate",-1);
      }

      else {
        getdata("commname",1);
      }


      function getdata(colname,sortorder)
      {

          comminstance.countDocuments(function(e,count){
            var start=parseInt(req.body.start);
            var len=parseInt(req.body.length);
            var mrule=req.body.commrule;
            var search=req.body.search.value;
            var getcount=10;
            console.log(req.body.search.value.length);


          var findobj={};
            console.log(mrule);
            if(mrule!="all")
               { findobj.commrule=mrule;}
            else{
                delete findobj["commrule"];
            }
            if(search!='')
                findobj["$or"] = [{
                "commname":  { '$regex' : search, '$options' : 'i' }
            }, {
                "commrule":{ '$regex' : search, '$options' : 'i' }
            },{
                "commlocation": { '$regex' : search, '$options' : 'i' }
            }
            ,{
                "commowner":  { '$regex' : search, '$options' : 'i' }
            }
            ,{
                "commdate": { '$regex' : search, '$options' : 'i' }
            }]
            else
              delete findobj["$or"];

            comminstance.find(findobj).countDocuments(function(e,coun){
            getcount=coun;
          }).catch(err => {
            console.error(err)
            res.send(error)
          })

            comminstance.find(findobj).skip(start).limit(len).sort({[colname] : sortorder})
            .then(data => {
                res.send({"recordsTotal" : count,"recordsFiltered" :getcount,data})
              })
              .catch(err => {
                console.error(err)
              //  res.send(error)
              })
            })
          }
        })

////////////////////////////////////////////////////////////////////////////////////////////////////////

// IMAGE ADDING CODE
var photoname ;

var storage = multer.diskStorage({
  destination : './public/uploads/',
  filename : function(req, file, callback)
  {
    photoname='/'+file.fieldname + '-' + Date.now() + '@' +path.extname(file.originalname)
    callback(null,photoname);
  }
})

var upload = multer({
  storage : storage
}).single('myImage');

app.post('/upload',(req,res) => {
  upload(req,res,(err)=>{
    if(err)
    {
      throw error;
    }
    else{
      console.log(req.file);
      console.log(photoname);
      console.log(req.session.data._id);

      instance.updateOne({ "_id" : req.session.data._id } , { $set : { "photoname" : photoname } }  ,function(error,result)
      {
        console.log(result);
        if(error)
          {
            console.log("error vale mai");
            throw error;
          }
        else
        {
          console.log("update vale mai");
          req.session.data.photoname = photoname;
          console.log(req.session.data);
          console.log(req.session.data.photoname);
          res.render('profile', { obj : req.session.data });
        }
      })
  }
})
});




//  PASSPORT
// shi hai brackets
    var GitHubStrategy = require('passport-github').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user,done){
        done(null,user);
    });

    passport.deserializeUser(function(user,done){
        done(null,user);
    });



    passport.use(
        new GitHubStrategy({
        clientID:'acea048c1c8e998add96',
        clientSecret: '08bd6b88a0b9806bb0bb1ff781a562ac1d1d830e',
        callbackURL: "/auth/github/callback",
        session:true
    },function(accessToken, refreshToken, profile, cb) {
            console.log('###############################');
            console.log('passport callback function fired');
            console.log(profile);

            return cb(null,profile);

        })
    );

    app.get('/auth/github', passport.authenticate('github'));


    app.get('/auth/github/callback',passport.authenticate('github',{failureRedirect:'login_page.html'}),function(req,res)
    {
        console.log("loginSUCCESFULL");

        instance.findOne({
            githubid : req.session.passport.user._json.id
        })
        .then(data =>
        {
            console.log(data)
            if(data)
            {

                var ob = new Object();
                ob.isLogin = 1;
                ob.name = data.name;
                ob.email = data.email;
                ob.password = data.password;
                ob.phone = data.phone;
                ob.city = data.city;
                ob.dob = data.dob;
                ob.role = data.role;
                ob.gender = data.gender;
                ob.status = data.status;
                ob.state  = data.state;
                ob.interest = data.interest;
                ob.journey = data.journey;
                ob.expectations = data.expectations;
                ob.githubid = data.githubid;
                ob._id = data._id;
                ob.photoname = data.photoname;
                ob.isupdate = data.isupdate,
                req.session.data = ob;
                console.log("+++++++++++++++++++++++++++++")
                console.log(ob);
                console.log(req.session.data);
                console.log(data);
                console.log("-----------------------------")
                res.redirect('/profilePage')
            }
            else
            {
                //NOT FOUND
                var obj = {
                name : req.session.passport.user._json.name,
                email : req.session.passport.user._json.email,
                city : req.session.passport.user._json.location,
                status : "pending",
                role : "user",
                githubid : req.session.passport.user._json.id,
                photoname : "default.png",
                state : "0",
                }
                instance.create(obj,function(error,result)
                {
                    if(error)
                    throw error;
                    else
                     {

                         console.log(result);
                        req.session.data = obj;
                        instance.findOne({githubid : req.session.passport.user._json.id})
                        .then(data =>
                        {
                            req.session.data._id = data._id;
                        })
                        .catch(err =>
                        {
                            throw err;
                        })
                        res.redirect('/profilePage')
                    }
                })
            }
        })
        .catch(err =>
        {
          res.send(err)
        })
    })



app.listen(3000);

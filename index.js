var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var myDB = "mongodb://sagar:test@ds249025.mlab.com:49025/sagar-oauth-test";
var schemas = require("./schemas/UserSchema");
var employeeModel = schemas.userModel;
var computerModel = schemas.computerModel;
mongoose.Promise = global.Promise;
var profileRoutes = require("./routes/profile-routes")
var port = 3000;
const passport = require("passport")
var app = express();
const authRoutes = require("./routes/auth-routes");
const cookieSession = require("cookie-session");

app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:["secret"]
}))

///initialize passport
app.use(passport.initialize());
app.use(passport.session())

//setup routes
app.use("/auth",authRoutes);
app.use("/profile",profileRoutes);


mongoose.connect(myDB,()=>{
  console.log("connected to mongodb")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/employees",(req,res,next)=>{
  employeeModel.find({}).exec()
    .then((emp)=>{
      res.send(emp);
    })
    .catch((err)=>{
      console.log(err);
      res.send("error occoured")
    })
})
app.post("/employee",(req,res,next)=>{
  var newUser = new employeeModel();
  newUser.email = req.body.email;
  newUser.name = req.body.name;
  newUser.age = req.body.age;
  newUser.save((err,employee)=>{
    if(err){
      console.log(err);
      res.send("error occoured")
    }else{
      res.json(employee)
    }
  })
})
app.get("/employees/:id",(req,res)=>{
  employeeModel.findOne({
    _id:req.params.id
  }).exec((err,book)=>{
    if(err){
      console.log(err);
      res.send("error occoured");
    }
    res.json(book)
  })
})
app.delete("/employee/:id",(req,res)=>{
  employeeModel.findOneAndRemove({_id:req.params.id},(err,emp)=>{
    if(err){
      console.log(err);
      res.send("errorc osd")
    }else{
      res.json(emp)
    }
  })
})
app.get("/home",(req,res)=>{
  res.send("welocme");
})
app.put("/employee/:id",(req,res)=>{
  employeeModel.findOneAndUpdate({
    _id:req.params.id
  },{
    $set:{fname: req.body.fname}
  },{
    upsert:true
  },(err,newEmp)=>{
    console.log(err);
    console.log(newEmp)
    if(err){
      console.log(err);
      res.send("eror occoue")
    }
    res.json(newEmp)
  })
})
//app.post("/employee",())


app.listen(port,()=>{
  console.log("listening at "+port);
})

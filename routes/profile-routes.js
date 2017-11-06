const router = require("express").Router();

const checkUser = (req,res,next)=>{
  console.log("struck here")
  if(!req.user){
    console.log("not logged in")
    res.redirect("/auth/login");
  }else{
    console.log("logged in")
    next();
  }
}

router.get("/",checkUser,(req,res)=>{
  console.log("reached the profile page")
  res.send("<img src="+req.user.thumbnail"+/>");
})

module.exports =router;

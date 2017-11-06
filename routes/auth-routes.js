const router = require("express").Router();
const passport = require("passport");
//auth login
const passportSetup = require("../config/passport-setup");
router.get("/login",(req,res)=>{
res.send("broo you are just awesome")
})

router.get("/logout",(req,res)=>{
req.logout();
res.redirect("/home");
})

router.get("/google",passport.authenticate("google",{
  scope:["profile"]
}))

router.get("/google/callback",passport.authenticate("google"),(req,res)=>{
  res.redirect("/profile/");
})
module.exports=router;

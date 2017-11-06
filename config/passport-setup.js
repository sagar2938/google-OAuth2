var passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20")
const User = require("../models/user-model");

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{
  User.findById(id).then((user)=>{
    done(null,user);
  })

})

passport.use(new GoogleStrategy({
  //options for Strategy
  callbackURL:"/auth/google/callback",
clientID: "293029682377-9jbnededv3najp6k3l9h6iqa6hpg5cup.apps.googleusercontent.com",
clientSecret: "dmnbV7SILdHxGNFlph5MIWyu"
},(accessToken,refreshToken,profile,done)=>{
  //passport call back function
  console.log("profile : "+profile);
  User.findOne({googleId:profile.id})
      .then((currentUser)=>{
        if(currentUser){
          console.log("user already registered")
          done(null,currentUser);
        }else{
          new User({
            username:profile.displayName,
            googleId:profile.id,
            thumbnail:profile._json.image.url
          }).save().then((newUser)=>{
            console.log("new user created : "+newUser);
            done(null,newUser);
          })
        }
      })

})
)

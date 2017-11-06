var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name : String,
  age : Number,
  email : {
    type: String,
    required: true,
    unique: true
  },
  date : {
    type: Date,
    default: Date.now
  },
  computer:{
    type: Schema.ObjectId,
    ref:"computer"
  }
});

var ComputerSchema = new Schema({
  id: String,
  name: String
})
var schemas = {
  userModel : mongoose.model("employee",UserSchema),
  computerModel: mongoose.model("computer",ComputerSchema)
}

module.exports = schemas;

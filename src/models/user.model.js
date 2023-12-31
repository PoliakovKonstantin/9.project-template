var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  fullName: String,
  password: String,
  email: String,
  isAdmin: Boolean,
  password: String,
  createdOn: String,
});

module.exports = mongoose.model("users", UserSchema);

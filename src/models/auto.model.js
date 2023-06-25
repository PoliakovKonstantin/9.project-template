var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AutoSchema = new Schema({
  Name: String,
  Description: String,
  Price: String,
  productImage: String,
  productRating: Number
});

module.exports = mongoose.model("autos", AutoSchema);

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  u_id: String,
  Date_order: String,
  Date_v: String,
  Auto_id: String,
  Price: Number
});

module.exports = mongoose.model("orders", OrderSchema);

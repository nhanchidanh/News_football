const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

//connect mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then((_) => console.log("Connected mongoose success!..."));
// .catch((err) => console.error(`Error: connect:::`, err));

module.exports = mongoose;

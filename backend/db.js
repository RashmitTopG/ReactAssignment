const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sahilKapse");

const UserSchema = new mongoose.Schema({
  rollNo: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  marks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Marks", // Single reference
  },
});

const MarksSchema = new mongoose.Schema({
  daaMarks: { type: Number, required: true },
  osMarks: { type: Number, required: true },
  cnMarks: { type: Number, required: true },
  dbmsMarks: { type: Number, required: true },
});

const User = mongoose.model("User", UserSchema);
const Marks = mongoose.model("Marks", MarksSchema);

module.exports = {
  User,
  Marks,
};

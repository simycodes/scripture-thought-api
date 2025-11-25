import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// REMOVE PASSWORD FROM THE USER DATA SENT TO THE FRONTEND
// toJSON IS AN INSTANCE METHOD THAT CAN USED ON THE User MODEL
UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);

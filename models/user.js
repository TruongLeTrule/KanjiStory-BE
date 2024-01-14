const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter username"],
    unique: true,
    lowercase: true,
    minlength: [6, "Minimum username length is 6 characters"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hashSync(this.password, salt);
  next();
});

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

module.exports = mongoose.model("User", UserSchema);

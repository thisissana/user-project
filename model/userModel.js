const mongoose = require("mongoose");

const schema = mongoose.Schema({
  firstName: {
    type: String,
    minLength: [3, "Min 3 characters"],
    maxLength: [100, "Max 100 characters"],
    required: [true, "First name required"],
  },
  lastName: {
    type: String,
    minLength: [3, "Min 3 characters"],
    maxLength: [100, "Max 100 characters"],
    required: [true, "Last name required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      validator: (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: () => "Invalid Email",
    },
  },
  password: {
    type: String,
    minLength: [6, "Max 6 chars"],
    maxLength: [100, "Max 100 chars"],
    required: [true, "Password is required"],
  },
});

const userModel = mongoose.model("user", schema);

schema.index({ firstName: 1 });
schema.index({ lastName: 1 });

module.exports = userModel;

/**
 * User.js
 *
 * @module      :: Model
 * @description :: Represent data model for the Users
 * @author		  ::
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const moment = require("moment");
const SALT_I = 10;
require("dotenv").config();

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    address: {
      local: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
    },
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  resetTokenExp: {
    type: String,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.genSalt(SALT_I, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.generateResetToken = function (cb) {
  let user = this;
  crypto.randomBytes(20, (err, buffer) => {
    let token = buffer.toString("hex");
    let today = moment().startOf("day").valueOf();
    let tomorrow = moment.startOf(today).endOf("day").valueOf();

    user.resetToken = token;
    user.resetTokenExp = tomorrow;
    user.save((err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

UserSchema.methods.generateToken = function (cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), process.env.SECRET);

  user.token = token;
  user.save((err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

UserSchema.statics.findByToken = function (token, cb) {
  let user = this;
  jwt.verify(token, process.env.SECRET, (err, decode) => {
    user.findOne({ _id: decode, token: token }, (err, user) => {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

module.exports = mongoose.model("User", UserSchema);

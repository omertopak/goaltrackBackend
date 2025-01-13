"use strict";

const mongoose = require("mongoose");
const passwordEncrypt = require('../helpers/passwordEncrypt')

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    email:{
        type: String,
        trim: true,
        required: [true, 'Email field must be required'],
        unique: [true, 'There is this email. Email field must be unique'],
        validate: [
            (email) => email.includes('@') && email.includes('.'),
            'Email type is not correct.'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: true,
        set: (password) => passwordEncrypt(password)
    },

  },
  { collection: "users", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("User", UserSchema);
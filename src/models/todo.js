"use strict";

const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    todo: {
      type: String,
      trim: true,
      required: true,
    },
    // status: {
    //   type: String,
    //   trim: true,
    //   required: true,
    //   default: "In Progress",
    // },
    priority: {
      type: String,
      trim: true,
      required: true,
      default: "Low",
      
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "todos", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Todo", TodoSchema);

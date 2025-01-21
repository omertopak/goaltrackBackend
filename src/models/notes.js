"use strict";

const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    note: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { collection: "todos", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Todo", TodoSchema);

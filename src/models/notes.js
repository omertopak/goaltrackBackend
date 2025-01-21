"use strict";

const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
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
  { collection: "notes", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Note", NoteSchema);

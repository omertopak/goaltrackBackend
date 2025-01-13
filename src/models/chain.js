"use strict";

const mongoose = require("mongoose");

const ChainSchema = new mongoose.Schema(
  {
    userId:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
               }
            ],
    chainName: {
      type: String,
      trim: true,
      required: true,
    },
    process: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  { collection: "chains", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Chain", ChainSchema);
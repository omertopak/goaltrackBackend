"use strict";

// const { mongoose } = require('../configs/dbConnection')
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
               },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    start: {
      type: String,
      trim: true,
      required: true,
    },
    allDay: {
      type: Boolean,
      required: true,
      default:true,
    },
  
    
  },
  { collection: "events", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Event", EventSchema);
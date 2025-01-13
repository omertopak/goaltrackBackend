"use strict";

// const { mongoose } = require('../configs/dbConnection')
const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema(
//   {
//     userId:[
//             {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'User'
//                }
//             ],

//     todo: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     status: {
//       type: String,
//       trim: true,
//       required: true,
//     },
//     priority: {
//       type: String,
//       trim: true,
//       required: true,
//       unique: true,
//     },
//     groups:{
//         type: String,
//         trim: true,
//         required: true,
//         unique: true,
//       },

//     completed: {
//       type: Boolean,
//       default: false,
//     },

    
//   },
  { collection: "calendars", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Calendar", CalendarSchema);
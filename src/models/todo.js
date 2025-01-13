"use strict";

// const { mongoose } = require('../configs/dbConnection')
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    userId:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
               }
            ],

    todo: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      trim: true,
      required: true,
    },
    priority: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    groups:{
        type: String,
        trim: true,
        required: true,
        unique: true,
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

// const passwordEncrypt = require('../helpers/passwordEncrypt')

// bio: {
//     type: String,
//     trim: true,
// },

// private: {
//     type: Boolean,
//     default: true,
// },

// followers:[
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Todo'
//        }
//     ],

// followers_count:{
//     type:Number,
//     default:0
// },

// following:[
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Todo'
//        }
//     ],

// following_count:{
//     type:Number,
//     default:0
// },

// image: {//mongo media
//     type: String,
//     trim: true,
// },

// background:{
//     type: String,
//     trim: true,
// },

// follow_request_sent: [
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Todo'
//        }
//     ],

// bookmarks:[
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Tweet'
//        }
//     ],

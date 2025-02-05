"use strict";

const User = require("../models/user");

module.exports.User = {

  list: async (req, res) => {
    const data = await User.find();

    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },

  create: async (req, res) => {
    try {
      const { userName, email, password } = req.body;
      const newUser = await User.create({userName, email, password,});
      console.log(newUser);
      res.status(202).send({
        error: false,
        result: newUser,
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        message: "Error registering user.",
        details: error,  
      });
    }
  },

//   read: async (req, res) => {
//     const userId = req.params.userId;

//     const user = await User.findOne({ _id: userId })

    
//     res.status(200).send({
//       error: false,
//       data: user,
//     });
//   },

  

  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });

    res.sendStatus(data.deletedCount >= 1 ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};

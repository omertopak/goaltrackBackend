"use strict"

const Chains = require('../models/chain')
const moment = require("moment");


module.exports.Chains = {
    read: async (req, res) => {
        try {
            const userId = req.user._id;
    
            const data = await Chains.find({ userId });
    
            return res.status(201).send({
                error: false,
                result: data,
            });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error.",
            });
        }
    },
  
    create: async (req, res) => {
        try {
            const userId = req.user._id;
            const chainData = req.body;
    
            const data = await Chains.create({ ...chainData, userId });
    
            return res.status(201).send({
                error: false,
                result: data,
            });
        } catch (error) {
            console.error("Error creating chain:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error creating chain.",
            });
        }
    },
    

    update: async (req, res) => {
        try {
            const chainId = req.params.ChainId
            const currentTime = moment().format("YYYY-MM-DD")
            const data = await Chains.findOne({ _id: chainId })
            const updatedAt = data.updatedAt
            const datePart = updatedAt.toISOString().split("T")[0];
            let message = ""
            if(currentTime===datePart){
                message = "You have already updated your chain today"
            }else{
                message = "Congrats! You are going on well!"
                await Chains.updateOne({ _id: chainId }, { $inc: { dayNumber: 1 } });

            }
            return res.status(201).send({
                error: false,
                result: message
            });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error to complete chain.",
            });
        }
    },
    
    delete: async (req, res) => {
        try {
            const chainId = req.params.ChainId;
            const chain = await Chains.findOne({ _id:chainId });
    
            if (!chain) {
                return res.status(404).send({
                    error: true,
                    message: "Chain not found.",
                });
            }
    
            await Chains.deleteOne({ _id:chainId });
    
            return res.status(201).send({
                error: false,
                result: "succesfully deleted",
            });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error!",
            });
        }
    },
}
"use strict"

const Chains = require('../models/chain')
const moment = require("moment");

module.exports.Chains = {
    read: async (req, res) => {
        try {
            const userId = req.user._id;
    
            const data = await Chains.find({ userId });
            
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);
            // console.log(todayStart);
            const nextDayStart = new Date(todayStart);
            nextDayStart.setDate(nextDayStart.getDate() + 1);
            const yesterdayStart = new Date(todayStart);
            yesterdayStart.setDate(yesterdayStart.getDate() - 1);
            // console.log(nextDayStart);
            const updatedDataPromises = data.map(async (chain) => {
                let chainId = chain._id
                // console.log(new Date(chain.updatedAt));
                if (!(new Date(chain.updatedAt) >= yesterdayStart && new Date(chain.updatedAt) < nextDayStart)) {
                        await Chains.updateOne({ _id: chainId },{ dayNumber:1});
                }
            });
            await Promise.all(updatedDataPromises);

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
            const chainId = req.params.ChainId;
            const data = await Chains.findOne({ _id: chainId });
    
            if (!data) {
                return res.status(404).send({ error: true, message: "Chain not found" });
            }
    
            const updatedAt = new Date(data.updatedAt);
    
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);
            const nextDayStart = new Date(todayStart);
            nextDayStart.setDate(nextDayStart.getDate() + 1);
            const yesterdayStart = new Date(todayStart);
            yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    
            let message = "";
    
            if (updatedAt >= todayStart && updatedAt < nextDayStart) {
                message = "You have already updated!";
            } else if (updatedAt >= yesterdayStart && updatedAt < todayStart) {
                message = "Congrats!";
                await Chains.updateOne({ _id: chainId }, { $inc: { dayNumber: 1 } });
            } else {
                message = "Unsuccesfull!";
            }
    
            return res.status(201).send({
                error: false,
                result: message,
            });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error while updating the chain.",
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
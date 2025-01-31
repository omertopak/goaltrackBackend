"use strict"

const Event = require('../models/event')

module.exports.Event = {
    read: async (req, res) => {
        try {
            const userId = req.user._id;
    
            const data = await Event.find({ userId });
    
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
            const eventsData = req.body;
    
            const data = await Event.create({ ...eventsData, userId });
    
            return res.status(201).send({
                error: false,
                result: data,
            });
        } catch (error) {
            console.error("Error creating event:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error creating event.",
            });
        }
    },
    

    update: async (req, res) => {
        try {
            const eventId = req.params.EventId;
            const eventsData = req.body;

            const data = await Event.updateOne({ _id: eventId },{ ...eventsData})
    
            return res.status(201).send({
                error: false,
                result: data,
            });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error to complete event.",
            });
        }
    },
    
    delete: async (req, res) => {
        try {
            const eventId = req.params.EventId;
            const event = await Event.findOne({ _id:eventId });
    
            if (!event) {
                return res.status(404).send({
                    error: true,
                    message: "Event not found.",
                });
            }
    
            await Event.deleteOne({ _id:eventId });
    
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
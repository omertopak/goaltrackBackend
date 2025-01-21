"use strict"

const Notes = require('../models/notes')

module.exports.Notes = {
    read: async (req, res) => {
        try {
            const userId = req.user._id;
    
            const data = await Notes.find({ userId });
    
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
            const notesData = req.body;
    
            const data = await Notes.create({ ...notesData, userId });
    
            return res.status(201).send({
                error: false,
                result: data,
            });
        } catch (error) {
            console.error("Error creating note:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error creating note.",
            });
        }
    },
    

    update: async (req, res) => {
        try {
            const noteId = req.params.NoteId;
            const notesData = req.body;

            const data = await Notes.updateOne({ _id: noteId },{ notesData})
    
            return res.status(201).send({
                error: false,
                result: data,
            });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error to complete note.",
            });
        }
    },
    
    delete: async (req, res) => {
        try {
            const noteId = req.params.NoteId;
            const note = await Notes.findOne({ _id:noteId });
    
            if (!note) {
                return res.status(404).send({
                    error: true,
                    message: "Note not found.",
                });
            }
    
            await Notes.deleteOne({ _id:noteId });
    
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
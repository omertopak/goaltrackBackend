"use strict"

const Todo = require('../models/todo')

module.exports.Tweet = {
    read: async (req, res) => {
        try {
            const userId = req.user._id;
    
            const data = await Todo.find({ userId });
    
            return res.status(201).send({
                error: false,
                result: data,
            });
        } catch (error) {
            console.error("Error creating todo:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error creating todo.",
            });
        }
    },
  
    create: async (req, res) => {
        try {
            const userId = req.user._id;
            const todoData = req.body;
    
            const data = await Todo.create({ ...todoData, userId });
    
            return res.status(201).send({
                error: false,
                result: data,
            });
        } catch (error) {
            console.error("Error creating todo:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error creating todo.",
            });
        }
    },
    

    done: async (req, res) => {
        try {
            const user_id = req.user._id
            const data = await Todo.updateOne({ _id: req.todoId },{ status:"completed" })
    
            return res.status(201).send({
                error: false,
                result: data,
            });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error to complete todo.",
            });
        }
    },

    status: async (req, res) => {
        try {
            const todo = await Todo.findOne({ _id: req.todoId });
    
            if (!todo) {
                return res.status(404).send({
                    error: true,
                    message: "Todo not found.",
                });
            }
    
            let newStatus;
            if (todo.status === "In Progress") {
                newStatus = "Completed";
            } else if (todo.status === "Completed") {
                newStatus = "Removed";
            } else {
                newStatus = "In Progress";
            }
            const data = await Todo.updateOne({ _id: req.todoId }, { status: newStatus });
    
            return res.status(201).send({
                error: false,
                result: data,
            });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error changing status.",
            });
        }
    },
    priority: async (req, res) => {
        try {
            const todo = await Todo.findOne({ _id: req.todoId });
    
            if (!todo) {
                return res.status(404).send({
                    error: true,
                    message: "Todo not found.",
                });
            }
    
            let newPriority;
            if (todo.priority === "High") {
                newPriority = "Low";
            } else if (todo.priority === "Low") {
                newPriority = "Medium";
            } else {
                newPriority = "High";
            }
            const data = await Todo.updateOne({ _id: req.todoId }, { priority: newPriority });
    
            return res.status(201).send({
                error: false,
                result: data,
            });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).send({
                error: true,
                message: "Error changing priority.",
            });
        }
    },
    
    
    
    delete: async (req, res) => {
        try {
            const todo = await Todo.findOne({ _id: req.todoId });
    
            if (!todo) {
                return res.status(404).send({
                    error: true,
                    message: "Todo not found.",
                });
            }
    
            await Todo.deleteOne({ _id: req.todoId });
    
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
// routes.js


const express = require("express");
const router = express.Router();
const User = require("../models/users");
const fs = require("fs").promises;




// Insert a manga into directory
router.post("/add_manga", async (req, res) => {
    try {
        if  (!req.body.name || !req.body.chapters || !req.body.finished) {
            return res.status(400).json({
                message: "Name, Chapters, and Finished are required fields",
                type: "danger",
            });
        }
        const user = new User({
            manga: req.body.manga,
            chapters: req.body.chapters,
            finished: req.body.finished,
        });


        await user.save();
        req.session.message = {
            type: "success",
            message: "Manga added successfully",
        };
        res.redirect("/");
    } catch (err) {
        res.status(500).json({ message: err.message, type: "danger" });
    }
});


// Get all route
router.get("/", async (req, res) => {
    try {
        const users = await User.find().exec();
        res.render("index", {
            title: "Manga Name",
            users: users,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/add_manga", (req, res) => {
    res.render("add_manga", { title: "Add Manga Name" });
});


// Edit route
router.get("/edit_manga", async (req, res) => {
    let id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.redirect("/");
        }
        res.render("edit_manga", {
            title: "Edit Manga Name",
            user: user,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Update route
router.post("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await User.findByIdAndUpdate(id, {
            manga: req.body.name,
           chapters : req.body.chapters,
            finished: req.body.finished,
        });


        req.session.message = {
            type: "success",
            message: "Manga Update Success!",
        };
        res.redirect("/");
    } catch (err) {
        res.status(500).json({ message: err.message, type: "danger" });
    }
});


// Delete route
router.get("/delete/:id", async (req, res) => {
    let id = req.params.id;
    try {

        req.session.message = {
            type: "info",
            message: "Manga Deletion Success!"
        };
        res.redirect("/");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
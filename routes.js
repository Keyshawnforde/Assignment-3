// routes.js


const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");
const fs = require("fs").promises;




// Insert a contact into the database route
router.post("/add_manga", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: req.file.filename,
        });


        await user.save();
        req.session.message = {
            type: "success",
            message: "Contact added successfully!!!!",
        };
        res.redirect("/");
    } catch (err) {
        res.status(500).json({ message: err.message, type: "danger" });
    }
});


// Get all users route
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


// Edit an user route
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


// Update user route
router.post("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let newImage = req.body.old_image;


        if (req.file) {
            newImage = req.file.filename;
            try {
                await fs.unlink(`./uploads/${req.body.old_image}`);
            } catch (err) {
                console.error(err);
            }
        }


        await User.findByIdAndUpdate(id, {
            Manga: req.body.name,
           Chapters : req.body.email,
            Finished: req.body.phone,
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


// Delete user route
router.get("/delete/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const result = await User.findByIdAndDelete(id);


        if (result.image !== "") {
            try {
                await fs.unlink(`./uploads/${result.image}`);
            } catch (err) {
                console.error(err);
            }
        }


        req.session.message = {
            type: "info",
            message: "Manga Deletion Success!"
        };
        res.redirect("/");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Contact Me route
router.get("/manga", (req, res) => {
    res.render("manga", { title: "Manga Name" });
});


router.post("/manga", (req, res) => {
    // Handle the form submission here if needed
    res.redirect("/manga");
});


module.exports = router;
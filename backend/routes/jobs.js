import express from "express";
import supabase from "../db/supabase.js";

const router = express.Router();

// Insert a new job into the database
router.post("/", async (req, res) => {
    const { jobTitle, companyName } = req.body;

    const { data, error } = await supabase
        .from("jobs")
        .insert({
            title: jobTitle,
            companyName: companyName,
            status: "Applied",
        })
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
});

export default router;
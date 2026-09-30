import express from "express";
import supabase from "../db/supabase.js";

const router = express.Router();

// Insert a new job into the database
// POST /api/jobs
router.post("/", async (req, res) => {
    const { jobTitle, companyName } = req.body;

    const { data, error } = await supabase
        .from("jobs")
        .insert({
            title: jobTitle,
            company_name: companyName,
            status: "applied",
        })
        .select();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
});

// READ ALL
// GET /api/jobs
router.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("id", { ascending: false });

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
});


// READ ONE
// GET /api/jobs/:id
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(data);
});


// UPDATE
// PUT /api/jobs/:id
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { jobTitle, companyName, status } = req.body;

    const { data, error } = await supabase
        .from("jobs")
        .update({
            title: jobTitle,
            company_name: companyName,
            status: status,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
});


// DELETE
// DELETE /api/jobs/:id
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from("jobs")
        .delete()
        .eq("id", id)
        .select()
        .single();

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
});


export default router;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import pool from "./db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// =========================
// Middleware
// =========================

app.use(cors());

app.use(express.json());

// Serve frontend from root public folder
app.use(express.static(path.join(__dirname, "../../public")));

// =========================
// Health Check
// =========================

app.get("/api/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
    });
  }
});

// =========================
// Get All Notes
// =========================

app.get("/api/notes", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
        id,
        title,
        content,
        category,
        created_at,
        updated_at
      FROM notes
      ORDER BY created_at DESC
      `,
    );

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch notes",
    });
  }
});

// =========================
// Get Single Note
// =========================

app.get("/api/notes/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
        id,
        title,
        content,
        category,
        created_at,
        updated_at
      FROM notes
      WHERE id = ?
      `,
      [req.params.id],
    );

    const notes = rows as any[];

    if (notes.length === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json(notes[0]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch note",
    });
  }
});

// =========================
// Create Note
// =========================

app.post("/api/notes", async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const [result] = await pool.query(
      `
      INSERT INTO notes
      (title, content, category)
      VALUES (?, ?, ?)
      `,
      [title, content, category || "General"],
    );

    res.status(201).json({
      message: "Note created successfully",
      id: (result as any).insertId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create note",
    });
  }
});

// =========================
// Update Note
// =========================

app.put("/api/notes/:id", async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const [result] = await pool.query(
      `
      UPDATE notes
      SET
        title = ?,
        content = ?,
        category = ?
      WHERE id = ?
      `,
      [title, content, category || "General", req.params.id],
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update note",
    });
  }
});

// =========================
// Delete Note
// =========================

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      `
      DELETE FROM notes
      WHERE id = ?
      `,
      [req.params.id],
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete note",
    });
  }
});

// =========================
// Start Server
// =========================

app.listen(PORT, () => {
  console.log(`Scribix server running on port ${PORT}`);
});

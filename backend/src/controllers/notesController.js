import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  const newNote = {
    title: req.body.title,
    content: req.body.content,
  };
  try {
    const note = await Note.create(newNote);
    res.status(200).send(note);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(id, req.body);
    if (!updateNote) {
      return res.status(404).json({ message: "Note not found" });
    } else {
      res.status(200).json({ message: "Notes updated successfully" });
    }
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    } else {
      res.status(200).json({ message: "Notes deleted successfully" });
    }
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

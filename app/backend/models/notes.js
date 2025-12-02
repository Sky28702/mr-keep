import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    title: { type: String },
    text: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const Notes = mongoose.models.Notes || mongoose.model("Notes", notesSchema);
export default Notes;

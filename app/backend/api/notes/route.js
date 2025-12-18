import connectdb from "../../db/dbConnect";
import Notes from "../../models/notes";

export async function POST(req) {
  try {
    await connectdb();
    const data = await req.json();

    const note = new Notes({
      title: data.title,
      text: data.text,
      userId: data.userId,
    });

    await note.save();
    return Response.json({
      success: true,
      noteData: note,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req) {
  try {
    await connectdb();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return Response.json({ error: "userId is required" });
    }
    const notes = await Notes.find({ userId });
    return Response.json({
      notes: notes,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req) {
  try {
    await connectdb();

    const { searchParams } = new URL(req.url);
    const notesId = searchParams.get("notesId");
    if (!notesId) {
      return Response.json({ error: "noteId is required" });
    }
    const body = await req.json();
    const notes = await Notes.findByIdAndUpdate(notesId, body);

    return Response.json({
      notes: notes,
    });
  } catch (error) {
    console.log(error);
  }
}

import Notes from "../../../models/notes";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const notesId = searchParams.get("notesId");
    if (!notesId) {
      return Response.json({
        error: `Notes Id is required`,
      });
    }
    const viewNote = await Notes.findById(notesId);
    return Response.json({
      notes: viewNote,
    });
  } catch (error) {
    console.log(error);
  }
}

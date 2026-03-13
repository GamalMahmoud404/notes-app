// كارت عرض النوتة
function NoteCard({ note, onEdit, onDelete, onView }) {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content.substring(0, 80)}...</p>
      <div className="buttons">
        <button onClick={() => onView(note)}>View</button>
        <button onClick={() => onEdit(note)}>Edit</button>
        <button onClick={() => onDelete(note._id)}>Delete</button>
      </div>
    </div>
  );
}

export default NoteCard;
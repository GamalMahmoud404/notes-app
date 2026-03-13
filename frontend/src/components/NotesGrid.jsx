import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

export default function NotesGrid({ notes, onEdit, onDelete, onView }) {
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 6; // عدد الملاحظات في الصفحة الواحدة

  // احسب الملاحظات اللي هتظهر في الصفحة الحالية
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const totalPages = Math.ceil(notes.length / notesPerPage);

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <div className="notes-grid">
        {currentNotes.map((note) => (
          <div key={note._id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="buttons">
              <button onClick={() => onEdit(note)}>
                <AiOutlineEdit style={{ marginRight: "3px", verticalAlign: "middle" }} />
                Edit
              </button>

              <button onClick={() => onDelete(note._id)}>
                <AiOutlineDelete style={{ marginRight: "3px", verticalAlign: "middle" }} />
                Delete
              </button>

              <button onClick={() => onView(note)}>
                <AiOutlineEye style={{ marginRight: "3px", verticalAlign: "middle" }} />
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={goToPrev} disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button onClick={goToNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
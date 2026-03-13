import { useState, useEffect } from "react";
import API from "../api";
import NoteModal from "../components/NoteModal";
import ConfirmModal from "../components/ConfirmModal";
import NotesGrid from "../components/NotesGrid";
import { AiOutlinePlus } from "react-icons/ai";
import "../App.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  const addNote = async (data) => {
    await API.post("/notes", data);
    fetchNotes();
    setModalOpen(false);
  };

  const updateNote = async (data) => {
    await API.put(`/notes/${editingNote._id}`, data);
    fetchNotes();
    setEditingNote(null);
    setModalOpen(false);
  };

  const handleSave = (data) => {
    if (editingNote) updateNote(data);
    else addNote(data);
  };

  const handleDeleteClick = (id) => {
    setNoteToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;

    await API.delete(`/notes/${noteToDelete}`);

    setNoteToDelete(null);
    setConfirmOpen(false); // ← يقفل الـ popup
    fetchNotes();
  };

  return (
    <div className="page_master">
      {/* زر إضافة ملاحظة مع أيقونة */}
      <button
        className="add-btn"
        onClick={() => {
          setEditingNote(null);
          setModalOpen(true);
          setViewOnly(false);
        }}
      >
        <AiOutlinePlus className="AiOutlinePlus-d" style={{ marginRight: "5px", verticalAlign: "middle" }} />
        Add Note
      </button>

      {/* شبكة الملاحظات */}
      <NotesGrid
        notes={notes}
        onEdit={(note) => {
          setEditingNote(note);
          setModalOpen(true);
          setViewOnly(false);
        }}
        onDelete={handleDeleteClick}
        onView={(note) => {
          setEditingNote(note);
          setModalOpen(true);
          setViewOnly(true);
        }}
      />

      <NoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingNote={editingNote}
        viewOnly={viewOnly}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this note?"
      />
    </div>
  );
}

export default Home;
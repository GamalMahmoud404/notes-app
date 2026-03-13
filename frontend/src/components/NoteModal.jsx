import { useState, useEffect } from "react";

function NoteModal({ isOpen, onClose, onSave, editingNote, viewOnly }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false); // state للانميشن

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else if (isOpen) {
      setTitle("");
      setContent("");
    }
  }, [editingNote, isOpen]);

  // عند فتح المودال، شغل الانميشن بعد render
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen && !visible) return null; // منع render لو المودال مغلق بالكامل

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose(); // بعد انتهاء الانميشن، نغلق المودال
    }, 300); // نفس مدة الانميشن في CSS
  };

  const handleSubmit = () => {
    if (!title || !content) return alert("Please fill all fields");
    onSave({ title, content });
  };

  return (
    <div className={`modal ${visible ? "open" : "close"}`}>
      <div className={`modal-content ${visible ? "open" : "close"}`}>
        <h2>{viewOnly ? "View Note" : editingNote ? "Edit Note" : "Add Note"}</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          readOnly={viewOnly}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          readOnly={viewOnly}
          rows={10}
        />
        {!viewOnly && <button onClick={handleSubmit}>Save</button>}
        <button onClick={handleClose}>{viewOnly ? "Close" : "Cancel"}</button>
      </div>
    </div>
  );
}

export default NoteModal;
import { useState, useEffect } from "react";

function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  const [visible, setVisible] = useState(false);

  // تشغيل الانميشن عند فتح المودال
  useEffect(() => {
    if (isOpen) setVisible(true);
    else setVisible(false);
  }, [isOpen]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // نفس مدة الانميشن
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  if (!isOpen && !visible) return null;

  return (
    <div className={`modal ${visible ? "open" : "close"}`}>
      <div className={`modal-content ${visible ? "open" : "close"}`}>
        <h3>{message}</h3>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "15px", gap:"20px" }}>
          <button
            onClick={handleConfirm}
            style={{ backgroundColor: "#d32f2f", color: "white" , width:"90px" }}
          >
            Yes
          </button>
          <button
            onClick={handleClose}
            style={{ backgroundColor: "#1976d2", color: "white" , width:"90px"}}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
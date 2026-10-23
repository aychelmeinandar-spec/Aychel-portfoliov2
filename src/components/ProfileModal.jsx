import React from "react";

export function ProfileModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="profile-modal" onClick={onClose}>
      <div
        className="profile-modal-content profile-card-style"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="profile-modal-close"
          onClick={onClose}
          aria-label="Tutup profil"
        >
          ×
        </button>

        <img
          src="/profile-aychel.jpg"
          alt="Foto profil Aychel"
          className="profile-modal-image"
        />

        <div className="profile-info">
          <h3>
            Aychel Gusti M.
            <span className="verified-mark" title="Verified">
              ✓
            </span>
          </h3>
          <p>FullStack Developer – Profile Avatar</p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

const PodcastUI = ({
  show,
  onClose,
  title = 'Audio',
  audioSrc,
}) => {
  if (!show) return null;

  return (
    <div className="audio-modal-overlay" onClick={onClose}>
      <div
        className="audio-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="audio-modal-header">
          <h2>{title}</h2>

          <button
            className="audio-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <audio controls className="audio-player">
          <source src={audioSrc} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
};

export default PodcastUI;
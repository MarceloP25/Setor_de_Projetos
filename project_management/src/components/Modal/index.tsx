
import "./styles.css";

type ModalProps = {
  isOpen: boolean;
  message?: string;
  title?: string;
  onClose: () => void;
  onAfterClose?: () => void;
};

export function Modal({
  isOpen,
  title,
  message,
  onClose,
  onAfterClose,
}: ModalProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    onAfterClose?.();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {title && <h2>{title}</h2>}
        {message && <p>{message}</p>}

        <button className="modal-button" onClick={handleClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}

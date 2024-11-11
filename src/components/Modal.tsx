import React from "react";
import { createPortal } from "react-dom";

type Props = {
  modalTitle?: React.ReactNode;
  modalContent?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  withButton?: boolean;
};
export const Modal = ({
  modalTitle = "defaul title",
  modalContent = "default modal content",
  isOpen = true,
  onClose,
  withButton = false,
}: Props) => {
  React.useEffect(() => {
    // Prevent scrolling when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // close modal on escape key press
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    // Cleanup
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);
  if (!isOpen) {
    return null;
  }
  return (
    <div>
      {createPortal(
        <>
          <div className="absolute top-0 isolate z-10 flex h-full w-full items-center justify-center">
            <div
              className="absolute top-0 isolate flex h-full w-full bg-slate-400 opacity-40"
              onClick={onClose}
            ></div>
            <div className="modal-box">
              <h3 className="text-lg font-bold">{modalTitle}</h3>
              <div>{modalContent}</div>
              {withButton && (
                <div>
                  <button
                    className="btn btn-primary ml-auto block"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </>,
        document.body,
      )}
    </div>
  );
};

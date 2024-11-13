import React from "react";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  withButton?: boolean;
  children?: React.ReactNode;
};
export const Modal = ({
  isOpen = true,
  onClose,
  withButton = false,
  children
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
  }, [isOpen, onClose]);
  if (!isOpen) {
    return null;
  }
  return (
    <div>
      {createPortal(
        <>
          <div className="fixed top-0 isolate z-10 flex h-full w-full items-center justify-center">
            <div
              className="fixed top-0 isolate flex h-full w-full bg-slate-400 opacity-40"
              onClick={onClose}
            ></div>
            <div className="modal-box">
              <div>{children}</div>
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

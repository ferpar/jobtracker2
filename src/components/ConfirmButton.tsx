"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  buttonText: string;
  className?: string;
  onClick?: () => void;
  confirmClass?: string;
};

export const ConfirmButton: React.FC<Props> = ({
  buttonText,
  children,
  className,
  onClick,
  confirmClass,
}) => {
  const [confirm, setConfirm] = React.useState(false);
  const [committed, setCommitted] = React.useState(false);

  React.useEffect(() => {
    if (confirm && !committed) {
      // clicking outside the button will reset the confirm state
      const reset = () => setConfirm(false);
      document.addEventListener("click", reset);
      return () => document.removeEventListener("click", reset);
    }
  }, [confirm, committed]);

  return confirm ? (
    <button
      className={confirmClass}
      onClick={() => {
        setCommitted(true);
        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  ) : (
    <button
      className={className}
      onClick={() => {
        setConfirm(true);
      }}
    >
      {buttonText}
    </button>
  );
};

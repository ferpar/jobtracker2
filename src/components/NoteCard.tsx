import { useState } from "react";

import ReactMarkdown from "react-markdown";

import type { Note } from "@prisma/client";

export const NoteCard = ({
  note,
  onDelete,
  onEdit,
}: {
  note: Note;
  onDelete: () => void;
  onEdit?: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : ""
          } collapse`}
        >
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="collapse-title text-xl font-bold"
            style={{ cursor: "pointer" }}
          >
            {note.title}
          </div>
          <div className="collapse-content">
            <article className="prose lg:prose-xl">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
          <div className="card-actions mx-2 justify-end">
            {onEdit && (
              <button
                className="btn btn-secondary btn-sm px-5"
                onClick={onEdit}
              >
                Edit
              </button>
            )}
            <button className="btn btn-warning btn-sm px-5" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

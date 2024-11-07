import { useState } from "react";
import type { Note } from "@prisma/client";
import { NoteCard } from "./NoteCard";
import { NoteEditor } from "./NoteEditor";

type NoteData = Pick<Note, "title" | "content">;
type Props = {
  note: Note;
  onDelete: () => void;
  onSave: (note: NoteData) => void;
};

// component that displays a note, switches between a preview and an editor
export const EditableNote = ({ note, onDelete, onSave }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
      <div>
        {isEditing ? (
          <NoteEditor
            onSave={(note) => {
              setIsEditing(false);
              onSave(note);
            }}
            onCancelEdit={() => setIsEditing(false)}
            note={note}
          />
        ) : (
          <NoteCard
            note={note}
            onDelete={onDelete}
            onEdit={() => setIsEditing(true)}
          />
        )}
      </div>
  );
};

import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

export const NoteEditor = ({
  onSave,
  onCancelEdit,
  note
}: {
  onSave: (note: { title: string; content: string }) => void;
  onCancelEdit?: () => void;
  note?: { title: string; content: string };
}) => {
  const [code, setCode] = useState<string>(note?.content ?? "");
  const [title, setTitle] = useState<string>(note?.title ?? "");

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Note title"
            className="input input-lg input-primary w-full font-bold"
            value={title}
            onChange={(e) => {
              console.log(e.currentTarget.value);
              setTitle(e.currentTarget.value);
            }}
          />
        </h2>
        <CodeMirror
          value={code}
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
          className="boder-gray-300 border"
        />
        <div className="card-actions justify-end">
          {onCancelEdit && (
            <button
              onClick={onCancelEdit}
              className="btn btn-secondary btn-sm px-5"
            >
              Cancel
            </button>  
          )
          }
          <button
            onClick={() => {
              onSave({ title, content: code });
              setCode("");
              setTitle("");
            }}
            className="btn btn-primary btn-sm px-5"
            disabled={title.trim().length === 0 || code.trim().length === 0}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

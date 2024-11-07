"use client";
import { useEffect, useState } from "react";
import type { Topic } from "@prisma/client";
import type { Session } from "next-auth";
import { api } from "~/trpc/react";
import { NoteEditor } from "./NoteEditor";
import { EditableNote } from "./EditableNote";

type Props = {
  sessionData: Session | null;
};

export const Content = ({ sessionData }: Props) => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [newTopic, setNewTopic] = useState<string>("");
  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
    },
  );

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    { topicId: selectedTopic?.id ?? "" },
    {
      enabled: sessionData?.user !== undefined && selectedTopic !== null,
    },
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetchNotes();
    },
  });

  const deleteNote = api.note.delete.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  const updateNote = api.note.update.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  const noTopics = topics?.length === 0;

  useEffect(() => {
    setSelectedTopic((selectedTopic) => selectedTopic ?? topics?.[0] ?? null);
  }, [topics]);

  return sessionData?.user ? (
    <div className="mx-5 mt-5 grid grid-cols-1 gap-2 md:grid-cols-4">
      <div className="px-2">
        <ul className="menu w-56 rounded-box bg-base-100 p-2">
          {topics?.map((topic) => (
            <li key={topic.id} className="pb-2">
              <a
                className={`menu-item ${topic.id === selectedTopic?.id ? "bg-primary-content" : ""}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedTopic(topic);
                }}
              >
                {topic.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="divider"></div>
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            createTopic.mutate({
              title: newTopic,
            });
            setNewTopic("");
          }}
        >
          <input
            type="text"
            placeholder="New topic"
            className="input input-sm input-bordered w-full"
            onChange={(e) => setNewTopic(e.currentTarget.value)}
          />
          <button className="btn btn-primary btn-sm mt-2 self-end">
            Add topic
          </button>
        </form>
      </div>
      <div className="col-span-3">
        <div>
          {notes?.map((note) => (
            <div key={note.id}>
              <EditableNote
                note={note}
                onDelete={() => void deleteNote.mutate({ id: note.id })}
                onSave={({ title, content }) => {
                  void updateNote.mutate({
                    id: note.id,
                    title,
                    content,
                  });
                }}
              />
            </div>
          ))}
        </div>
        {noTopics ? (
          <div className="mx-5 mt-5">Create a topic to add notes</div>
        ) : (
          <NoteEditor
            onSave={({ title, content }) => {
              void createNote.mutate({
                title,
                content,
                topicId: selectedTopic?.id ?? "",
              });
            }}
          />
        )}
      </div>
    </div>
  ) : (
    <div className="mx-5 mt-5">
      Sign in with google or github to see your notes
    </div>
  );
};

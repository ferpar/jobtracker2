"use client"
import React from "react";
import { api } from "~/trpc/react";
import { ApplicationsList } from "./ApplicationsList";
import { AddApplication } from "./AddApplication";
import { AddIcon } from "./Icons";
import type { Session } from "next-auth";
type Props = {
  sessionData: Session | null;
}

export const Applications = ({sessionData}: Props) => {
  const [ formOpen, setFormOpen ] = React.useState(false);

  const {data: jobApplications = [], refetch: refetchApplications, isLoading: loadingApplications } = api.jobApplication.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const deleteApplicationHook = api.jobApplication.delete.useMutation({
    onSuccess: () => {
      return refetchApplications();
    },
  });
  const deleteApplication = (id: string) => {
    deleteApplicationHook.mutate({id});
  };

  if (!sessionData?.user) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="px-4">
      <div className="flex items-center my-4 gap-4">
        <h2 className="text-2xl font-bold flex-1">Your Applications</h2>
        <button
          className={"btn btn-primary" + (formOpen ? " btn-outline" : "")}
          onClick={() => setFormOpen(!formOpen)}
        >
          <AddIcon />
          <span className="ml-2">Add Application</span>
        </button>
      </div>
      { formOpen ? <AddApplication refetchApplications={refetchApplications}/> : null }
      <ApplicationsList applications={jobApplications} deleteApplication={deleteApplication} loadingApplications={loadingApplications}/>
    </div>
  );
}
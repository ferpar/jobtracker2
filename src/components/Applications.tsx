"use client"
import { api } from "~/trpc/react";
import { ApplicationsList } from "./ApplicationsList";
import { AddApplication } from "./AddApplication";
import type { Session } from "next-auth";
type Props = {
  sessionData: Session | null;
}

export const Applications = ({sessionData}: Props) => {

  const {data: jobApplications = [], refetch: refetchApplications } = api.jobApplication.getAll.useQuery(
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
      <h1 className="text-3xl font-bold my-4">Applications</h1>
      <ApplicationsList applications={jobApplications} deleteApplication={deleteApplication} />
      <AddApplication refetchApplications={refetchApplications}/>
    </div>
  );
}
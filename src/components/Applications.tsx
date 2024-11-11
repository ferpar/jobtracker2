"use client";
import React from "react";
import { api } from "~/trpc/react";
import { ApplicationsList, JobApplicationWithStatus } from "./ApplicationsList";
import { AddApplication } from "./AddApplication";
import { AddIcon } from "./Icons";
import { Modal } from "./Modal";
import { ApplicationDetails } from "./ApplicationDetails";
import {
  type Filter,
  applicationStatuses,
  groupFilters,
} from "~/core/filtering";
import type { Session } from "next-auth";

type Props = {
  sessionData: Session | null;
};

export const Applications = ({ sessionData }: Props) => {
  const [formOpen, setFormOpen] = React.useState(false);
  const [filter, setFilter] = React.useState<Filter>("All");
  const [viewDetails, setViewDetails] = React.useState("testid");

  const {
    data: jobApplications = [],
    refetch: refetchApplications,
    isLoading: loadingApplications,
  } = api.jobApplication.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const deleteApplicationHook = api.jobApplication.delete.useMutation({
    onSuccess: () => {
      return refetchApplications();
    },
  });
  const deleteApplication = (id: string) => {
    deleteApplicationHook.mutate({ id });
  };

  const addStatusHook = api.jobApplication.addStatus.useMutation({
    onSuccess: () => {
      return refetchApplications();
    },
  });
  const addStatus = (applicationId: string, status: string) => {
    addStatusHook.mutate({ id: applicationId, status, date: new Date() });
  };

  if (!sessionData?.user) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="isolate px-4">
      <div className="my-4 flex flex-col items-center gap-4 md:flex-row md:flex-wrap">
        <h2 className="flex-1 text-2xl font-bold">Your Applications</h2>
        <select
          className="select select-bordered"
          value={filter}
          onChange={(e) => setFilter(e.target.value as Filter)}
        >
          <optgroup label={"by group"}>
            {groupFilters.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </optgroup>
          <optgroup label={"by status"}>
            {applicationStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </optgroup>
        </select>
        <button
          className={"btn btn-primary" + (formOpen ? " btn-outline" : "")}
          onClick={() => setFormOpen(!formOpen)}
        >
          <AddIcon />
          <span className="ml-2">Add Application</span>
        </button>
      </div>
      {formOpen ? (
        <AddApplication refetchApplications={refetchApplications} />
      ) : null}
      <ApplicationsList
        applications={jobApplications}
        deleteApplication={deleteApplication}
        loadingApplications={loadingApplications}
        addStatus={addStatus}
        filter={filter}
      />
      {jobApplications.length > 0 && (
        <ApplicationDetails
          application={jobApplications[0] as JobApplicationWithStatus}
          isOpen={!!viewDetails}
          onClose={() => setViewDetails("")}
        />
      )}
    </div>
  );
};
